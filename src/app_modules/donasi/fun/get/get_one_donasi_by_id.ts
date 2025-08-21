"use server";

import prisma from "@/lib/prisma";

export async function Donasi_getOneById(donasiId: string) {
  const data = await prisma.donasi.findFirst({
    where: {
      id: donasiId,
    },
    include: {
      Author: true,
      imageDonasi: true,
      CeritaDonasi: true,
      DonasiMaster_Ketegori: true,
      DonasiMaster_Durasi: true,
      DonasiMaster_Status: true,
      Donasi_Invoice: true,
      Donasi_Kabar: true,
      Donasi_PencairanDana: true,
    },
  });

  return data;
}
