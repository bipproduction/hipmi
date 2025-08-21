"use server";

import prisma from "@/lib/prisma";

export async function Donasi_getOneKabar(kabarId: string) {
  const data = await prisma.donasi_Kabar.findFirst({
    where: {
      id: kabarId,
    },
  });
  return data;
}
