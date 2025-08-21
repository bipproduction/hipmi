"use server";

import prisma from "@/lib/prisma";

export default async function getOneTransaksiBerhasilByIdInvestasi(
  idTransaksi: string
) {
  const data = await prisma.transaksiInvestasi.findUnique({
    where: {
      id: idTransaksi,
    },
    select: {
      Investasi: {
        select: {
          author: {
            select: {
              nomor: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  imageId: true,
                },
              },
            },
          },
          BeritaInvestasi: true,
          DokumenInvestasi: true,
          ProspektusInvestasi: true,
          MasterPembagianDeviden: true,
          MasterPencarianInvestor: true,
          MasterPeriodeDeviden: true,
          id: true,
          title: true,
          countDown: true,
          imagesId: true,
          roi: true,
          targetDana: true,
          totalLembar: true,
          sisaLembar: true,
          hargaLembar: true,
        },
      },
      id: true,
      gross_amount: true,
      quantity: true,
      transaction_id: true,
      status_message: true,
      payment_type: true,
      namaBank: true,
    },
  });

  return data;
}
