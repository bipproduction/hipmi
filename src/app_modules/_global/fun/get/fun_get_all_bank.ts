"use server";

import prisma from "@/lib/prisma";

export async function funGlobal_getAllBank() {
  const data = await prisma.masterBank.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      isActive: true,
    },
  });
  return data;
}
