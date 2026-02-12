import { prisma } from './prisma';

/**
 * Utility function to safely execute Prisma operations
 * This prevents improper disconnection of the Prisma client
 * which was causing high CPU usage and connection pool issues
 */
export async function executeDbOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string = "Database operation failed"
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    console.error(errorMessage, error);
    return { success: false, error: (error as Error).message };
  }
  // Note: We intentionally do NOT call prisma.$disconnect() here
  // Prisma manages connection pooling automatically and disconnecting
  // on each request causes performance issues
}

export { prisma };