"use server";

import prisma from "@/lib/prisma";

export async function AdminDonasi_getOneById(id: string) {
  const res = await prisma.donasi.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      target: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      publishTime: true,
      catatan: true,
      progres: true,
      terkumpul: true,
      authorId: true,
      namaBank: true,
      rekening: true,
      totalPencairan: true,
      akumulasiPencairan: true,
      imagesId: true,
      donasiMaster_KategoriId: true,
      donasiMaster_DurasiId: true,
      donasiMaster_StatusDonasiId: true,
      Author: true,
      imageDonasi: true,
      CeritaDonasi: true,
      DonasiMaster_Ketegori: true,
      DonasiMaster_Durasi: true,
      DonasiMaster_Status: true,
      imageId: true,
    },
  });

  await prisma.$disconnect();
  return res;
}
