import { PrismaClient } from "@prisma/client";

// Deklarasikan variabel global untuk menandai apakah listener sudah ditambahkan
declare global {
  var prisma: PrismaClient;
  var prismaListenersAdded: boolean; // Flag untuk menandai listener
}

let prisma: PrismaClient;

// Validasi DATABASE_URL sebelum inisialisasi
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL tidak ditemukan di environment variables!');
  console.error('');
  console.error('Current working directory:', process.cwd());
  console.error('Available environment variables:', Object.keys(process.env).sort().join(', '));
  console.error('');
  console.error('Solusi:');
  console.error('  1. Pastikan file .env ada dan berisi DATABASE_URL, ATAU');
  console.error('  2. Set DATABASE_URL di system environment:');
  console.error('     export DATABASE_URL="postgresql://user:pass@host:port/dbname"');
  console.error('  3. Jika menggunakan systemd service, tambahkan di file service:');
  console.error('     [Service]');
  console.error('     Environment=DATABASE_URL=postgresql://...');
  console.error('');
  throw new Error('DATABASE_URL is required but not found in environment variables');
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    // Reduce logging in production to improve performance
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  // Explicitly connect to database dengan retry
  const maxRetries = 3;
  let retryCount = 0;
  
  const connectWithRetry = async () => {
    while (retryCount < maxRetries) {
      try {
        await prisma.$connect();
        console.log('✅ PostgreSQL connected successfully');
        return;
      } catch (error) {
        retryCount++;
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ PostgreSQL connection attempt ${retryCount}/${maxRetries} failed:`, errorMsg);
        
        if (retryCount >= maxRetries) {
          console.error('❌ All database connection attempts failed. Application will continue but database operations will fail.');
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        const waitTime = Math.min(1000 * Math.pow(2, retryCount), 10000);
        console.log(`⏳ Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  };

  // Initialize connection (non-blocking)
  connectWithRetry().catch(err => {
    console.error('Failed to initialize database connection:', err);
  });

} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['error', 'warn', 'info', 'query'], // More verbose logging in development
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
  prisma = global.prisma;
}

// Tambahkan listener hanya jika belum ditambahkan sebelumnya
if (!global.prismaListenersAdded) {
  // Handle graceful shutdown
  process.on("SIGINT", async () => {
    console.log("Received SIGINT signal. Closing database connections...");
    await prisma.$disconnect();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("Received SIGTERM signal. Closing database connections...");
    await prisma.$disconnect();
    process.exit(0);
  });

  // Handle uncaught errors
  process.on("uncaughtException", async (error) => {
    if (error.message.includes("Prisma") || error.message.includes("database")) {
      console.error("Uncaught database error:", error);
      await prisma.$disconnect();
    }
  });

  // Tandai bahwa listener sudah ditambahkan
  global.prismaListenersAdded = true;
}

export default prisma;
export { prisma };
