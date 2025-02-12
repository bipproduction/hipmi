"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function investasi_funGetAllPublishByUserId({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      countDown: "desc",
    },
    where: {
      authorId: userLoginId,
      masterStatusInvestasiId: "1",
    },
    include: {
      MasterPencarianInvestor: true,
    },
  });

  return data;
}
