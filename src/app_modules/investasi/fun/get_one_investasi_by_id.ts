"use server";
import prisma from "@/app/lib/prisma";

export default async function getOneInvestasiById(id: string) {
  const data = await prisma.investasi.findUnique({
    where: {
      id: id,
    },
    select: {
      imageId: true,
      prospektusFileId: true,
      id: true,
      author: {
        select: {
          id: true,
          username: true,
          nomor: true,
          Profile: true,
        },
      },
      title: true,
      authorId: true,
      hargaLembar: true,
      targetDana: true,
      totalLembar: true,
      sisaLembar: true,
      lembarTerbeli: true,
      progress: true,
      roi: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      catatan: true,
      imagesId: true,
      MasterStatusInvestasi: true,
      BeritaInvestasi: true,
      DokumenInvestasi: true,
      ProspektusInvestasi: true,
      MasterPembagianDeviden: true,
      MasterPencarianInvestor: true,
      MasterPeriodeDeviden: true,
      MasterProgresInvestasi: true,
      masterStatusInvestasiId: true,
      Investasi_Invoice: {
        where: {
          statusInvoiceId: "1",
        },
      },
      countDown: true,
    },
  });

  return data;
}
