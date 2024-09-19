"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function job_getAllStatusReject({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.job.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "4",
      authorId: userLoginId,
      isActive: true,
    },
  });

  return data;
}
