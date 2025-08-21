"use server";

import prisma from "@/lib/prisma";

export async function AdminDonasi_getListStatusInvoiceProses(donasiId: string) {
  const dataStatus = await prisma.donasi_Invoice.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiId: donasiId,
      donasiMaster_StatusInvoiceId: {
        equals: "2",
      },
    },
    select: {
      id: true,
      nominal: true,
      createdAt: true,
      Author: true,
      imagesId: true,
      Donasi: {
        select: {
          id: true,
          title: true,
          target: true,
          active: true,
          createdAt: true,
          updatedAt: true,
          publishTime: true,
          catatan: true,
          terkumpul: true,
          donasiMaster_KategoriId: true,
          donasiMaster_DurasiId: true,
          donasiMaster_StatusDonasiId: true,
          Author: true,
          imageDonasi: true,
          CeritaDonasi: true,
          DonasiMaster_Ketegori: true,
          DonasiMaster_Durasi: true,
          DonasiMaster_Status: true,
        },
      },
      DonasiMaster_Bank: true,
      DonasiMaster_StatusInvoice: true,
    },
  });

  return dataStatus;
}
