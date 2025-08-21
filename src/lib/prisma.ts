import { PrismaClient } from "@prisma/client";

// Deklarasikan variabel global untuk menandai apakah listener sudah ditambahkan
declare global {
  var prisma: PrismaClient;
  var prismaListenersAdded: boolean; // Flag untuk menandai listener
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Tambahkan listener hanya jika belum ditambahkan sebelumnya
if (!global.prismaListenersAdded) {
  // Handle uncaught errors
  process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception:", error);
    await prisma.$disconnect();
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", async (error) => {
    console.error("Unhandled Rejection:", error);
    await prisma.$disconnect();
    process.exit(1);
  });

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

  // Tandai bahwa listener sudah ditambahkan
  global.prismaListenersAdded = true;
}

export default prisma;
