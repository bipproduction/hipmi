"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminInvestasi_funGetAllPublish({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: [
      {
        countDown: "desc",
      },
    ],
    where: {
      active: true,
      masterStatusInvestasiId: "1",
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      MasterStatusInvestasi: true,
      BeritaInvestasi: true,
      DokumenInvestasi: true,
      ProspektusInvestasi: true,
      MasterPembagianDeviden: true,
      MasterPencarianInvestor: true,
      MasterPeriodeDeviden: true,
      author: true,
      Investasi_Invoice: {
        where: {
          statusInvoiceId: "2",
        },
      },
    },
  });

  const nCount = await prisma.investasi.count({
    where: {
      active: true,
      masterStatusInvestasiId: "1",
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
