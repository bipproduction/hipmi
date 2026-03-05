import { PrismaClient } from "@prisma/client";

/**
 * Instance global Prisma client untuk connection pooling
 * Menggunakan pattern globalThis untuk mencegah multiple instance selama:
 * - Hot module replacement (HMR) di development
 * - Multiple import di seluruh aplikasi
 * - Server-side rendering di Next.js
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Konfigurasi connection pool via parameter query DATABASE_URL:
// connection_limit=10&pool_timeout=20&connect_timeout=10
const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Hanya assign ke global di development untuk mencegah multiple instance saat HMR
// Di production, ini di-skip karena tidak ada HMR
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

/**
 * Handler graceful shutdown untuk koneksi Prisma
 * Panggil ini HANYA saat terminasi process (SIGINT/SIGTERM)
 * JANGAN panggil $disconnect() setelah query individual
 */
async function gracefulShutdown(): Promise<void> {
  console.log("[Prisma] Menutup koneksi database...");
  await prisma.$disconnect();
  console.log("[Prisma] Semua koneksi ditutup");
}

// Register shutdown handlers (hanya di environment Node.js)
if (typeof process !== "undefined") {
  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
}

export default prisma;
export { prisma };
