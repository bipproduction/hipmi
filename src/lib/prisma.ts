import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required but not found in environment variables");
}

const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn", "query"] : ["error", "warn"],
  });

// Selalu assign ke global agar hanya ada 1 instance (dev: cegah hot-reload, prod: cegah multiple instances)
global.prisma = prisma;

export default prisma;
export { prisma };
