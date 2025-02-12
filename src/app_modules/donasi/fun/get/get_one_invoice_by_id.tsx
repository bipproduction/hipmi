"use server";

import prisma from "@/lib/prisma";

export async function Donasi_getOneInvoiceById(invoiceId: string) {
  const res = await prisma.donasi_Invoice.findFirst({
    where: {
      id: invoiceId,
    },
    select: {
      id: true,
      nominal: true,
      donasiId: true,
      createdAt: true,
      donasiMaster_BankId: true,
      donasiMaster_StatusInvoiceId: true,
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
          progres: true,
          terkumpul: true,
          authorId: true,
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
      },
      DonasiMaster_Bank: true,
      DonasiMaster_StatusInvoice: true,
    },
  });
  return res;
}
