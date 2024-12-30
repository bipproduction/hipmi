import { PrismaClient } from "@prisma/client";

// Singleton PrismaClient untuk pengembangan
const globalForPrisma = globalThis as unknown as {
  __prisma__: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.__prisma__ ??
  new PrismaClient({
    // log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : [],
  });

// Gunakan PrismaClient yang sama jika sudah ada
if (process.env.NODE_ENV !== "production") {
  if (!globalForPrisma.__prisma__) {
    console.log("PrismaClient initialized in development mode");
  }
  globalForPrisma.__prisma__ = prisma;
}

process.on("SIGINT", async () => {
  console.log("Disconnecting PrismaClient...");
  await prisma.$disconnect();3
  process.exit(0);
});

// console.log("==> Test prisma");

export default prisma;
