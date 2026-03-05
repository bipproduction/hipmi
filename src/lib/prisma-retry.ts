import { prisma } from './prisma';

/**
 * Retry configuration for database operations
 */
interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  factor: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 100,
  maxDelay: 5000,
  factor: 2,
};

/**
 * Check if error is retryable (transient error)
 */
function isRetryableError(error: any): boolean {
  const errorMsg = error instanceof Error ? error.message : '';
  
  // Retry on connection-related errors
  const retryablePatterns = [
    'ECONNRESET',
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
    'connection closed',
    'connection terminated',
    'connection timeout',
    'socket hang up',
    'too many connections',
    'pool is full',
    'server login has been failing',
    'FATAL:',
    'PrismaClientUnknownRequestError',
  ];
  
  return retryablePatterns.some(pattern => 
    errorMsg.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Execute database operation with retry mechanism
 * 
 * @param operation - The database operation to execute
 * @param config - Retry configuration (optional)
 * @param operationName - Name of the operation for logging
 * 
 * @example
 * const user = await withRetry(
 *   () => prisma.user.findUnique({ where: { id: '123' } }),
 *   undefined,
 *   'findUser'
 * );
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config?: Partial<RetryConfig>,
  operationName?: string
): Promise<T> {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: any;
  
  for (let attempt = 1; attempt <= retryConfig.maxRetries; attempt++) {
    try {
      const result = await operation();
      
      // Log success if it was a retry
      if (attempt > 1 && operationName) {
        console.log(`✅ [DB-RETRY] ${operationName} succeeded after ${attempt} attempts`);
      }
      
      return result;
    } catch (error) {
      lastError = error;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      
      // Check if we should retry
      if (attempt < retryConfig.maxRetries && isRetryableError(error)) {
        // Calculate delay with exponential backoff + jitter
        const delay = Math.min(
          retryConfig.initialDelay * Math.pow(retryConfig.factor, attempt - 1),
          retryConfig.maxDelay
        );
        const jitter = Math.random() * 0.3 * delay; // Add 30% jitter
        
        if (operationName) {
          console.warn(
            `⚠️ [DB-RETRY] ${operationName} failed (attempt ${attempt}/${retryConfig.maxRetries}): ${errorMsg}`
          );
          console.log(`⏳ [DB-RETRY] Retrying in ${Math.round(delay + jitter)}ms...`);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay + jitter));
      } else {
        // Don't retry - either max retries reached or not a retryable error
        if (operationName) {
          console.error(
            `❌ [DB-RETRY] ${operationName} failed after ${attempt} attempts: ${errorMsg}`
          );
        }
        break;
      }
    }
  }
  
  // All retries exhausted, throw the last error
  throw lastError;
}

/**
 * Execute database operation with timeout
 * 
 * @param operation - The database operation to execute
 * @param timeout - Timeout in milliseconds (default: 30000)
 * @param operationName - Name of the operation for logging
 */
export async function withTimeout<T>(
  operation: () => Promise<T>,
  timeout: number = 30000,
  operationName?: string
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeout}ms`));
    }, timeout);
  });
  
  try {
    return await Promise.race([operation(), timeoutPromise]);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    if (errorMsg.includes('timed out')) {
      if (operationName) {
        console.error(`⏱️ [DB-TIMEOUT] ${operationName} timed out after ${timeout}ms`);
      }
    }
    throw error;
  }
}

/**
 * Combine retry and timeout for robust database operations
 * 
 * @param operation - The database operation to execute
 * @param options - Retry and timeout options
 * @param operationName - Name of the operation for logging
 */
export async function withRetryAndTimeout<T>(
  operation: () => Promise<T>,
  options?: {
    retry?: Partial<RetryConfig>;
    timeout?: number;
  },
  operationName?: string
): Promise<T> {
  return withRetry(
    () => withTimeout(operation, options?.timeout, operationName),
    options?.retry,
    operationName
  );
}

/**
 * Health check for database connection
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await withTimeout(
      () => prisma.$queryRaw`SELECT 1`,
      5000,
      'healthCheck'
    );
    return true;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ [DB-HEALTH] Database connection check failed:', errorMsg);
    return false;
  }
}

export { prisma };
