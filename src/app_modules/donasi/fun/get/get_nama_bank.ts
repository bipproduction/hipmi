"use server";

import prisma from "@/lib/prisma";

export async function Donasi_getNamaBank(bankId: string) {
  const data = await prisma.donasiMaster_Bank.findFirst({
    where: {
      id: bankId,
    },
    select: {
      name: true,
      norek: true,
    },
  });

  return data;
}
