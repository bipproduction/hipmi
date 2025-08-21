"use server";

import prisma from "@/lib/prisma";

export async function Donasi_getMasterBank() {
  const data = await prisma.masterBank.findMany({
    // orderBy: {
    //   createdAt: "asc",
    // },
    where: {
      isActive: true,
    },
  });
  return data;
}
