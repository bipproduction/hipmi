"use server";

import prisma from "@/lib/prisma";

export default async function Admin_funGetAllInvestasi() {
  const res = await prisma.investasi.findMany({
    where: {
      MasterStatusInvestasi: {
        name: {
          not: "Draft",
        },
      },
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      hargaLembar: true,
      targetDana: true,
      totalLembar: true,
      roi: true,
      active: true,
      imagesId: true,
      catatan: true,
      MasterStatusInvestasi: true,
      BeritaInvestasi: true,
      DokumenInvestasi: true,
      ProspektusInvestasi: true,
      MasterPembagianDeviden: true,
      MasterPencarianInvestor: true,
      MasterPeriodeDeviden: true,
      author: true,
      progress: true,
      sisaLembar: true
    },
  });
  // console.log(res)
  return res;
}
