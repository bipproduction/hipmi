"use server";

import prisma from "@/lib/prisma";

export async function Donasi_getTotalPencairanDanaById(donasiId: string) {
  const data = await prisma.donasi.findFirst({
    where: {
      id: donasiId,
    },
    select: {
      id: true,
      totalPencairan: true,
      akumulasiPencairan: true,
      authorId: true
    },
  });

  return data;
}
