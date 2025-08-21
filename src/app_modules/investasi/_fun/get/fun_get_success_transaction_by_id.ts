"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function investasi_funGetSuccessTransactionById({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi_Invoice.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: userLoginId,
      statusInvoiceId: "1",
      isActive: true,
    },
    include: {
      Investasi: true,
    },
  });

  return data;
}
