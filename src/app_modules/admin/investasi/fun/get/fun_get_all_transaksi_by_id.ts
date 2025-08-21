"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminInvestasi_funGetAllTransaksiById({
  investasiId,
  page,
  selectStatus,
}: {
  investasiId: string;
  page: number;
  selectStatus?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi_Invoice.findMany({
    take: takeData,
    skip: skipData,
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    where: {
      investasiId: investasiId,
      isActive: true,
      statusInvoiceId: {
        contains: selectStatus,
        mode: "insensitive",
      },
    },
    include: {
      Author: true,
      Images: true,
      StatusInvoice: true,
      MasterBank: true,
    },
  });

  const nCount = await prisma.investasi_Invoice.count({
    where: {
      investasiId: investasiId,
      isActive: true,
      statusInvoiceId: {
        contains: selectStatus,
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
