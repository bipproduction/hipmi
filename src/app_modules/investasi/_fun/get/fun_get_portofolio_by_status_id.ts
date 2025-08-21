"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function investasi_funGetPortofolioByStatusId({
  page,
  statusId,
}: {
  page: number;
  statusId: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: userLoginId,
      masterStatusInvestasiId: statusId,
    },
    include: {
      MasterPencarianInvestor: true,
    },
  });

  return data;
}
