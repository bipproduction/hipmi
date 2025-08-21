"use server";

import prisma from "@/lib/prisma";

export async function funGlobal_getNomorAdmin() {
  const data = await prisma.nomorAdmin.findFirst({
    where: {
      isActive: true,
    },
  });

  return data
}
