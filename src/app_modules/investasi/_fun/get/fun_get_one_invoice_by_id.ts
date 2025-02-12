"use server";

import prisma from "@/lib/prisma";

export async function investasi_funGetOneInvoiceById({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const data = await prisma.investasi_Invoice.findFirst({
    where: {
      id: invoiceId,
    },
    include: {
      MasterBank: true,
      StatusInvoice: true,
      Investasi: {
        include: {
          MasterPembagianDeviden: true,
          MasterPencarianInvestor: true,
          MasterPeriodeDeviden: true,
          ProspektusInvestasi: true,
          Investasi_Invoice: {
            where: {
              statusInvoiceId: "1",
            },
          },
        },
      },
      Author: {
        include: {
          Profile: true,
        },
      },
    },
  });

  const { ...allData } = data;
  const Investor = data?.Investasi?.Investasi_Invoice;
  const result = { ...allData, Investor };

  return result;
}
