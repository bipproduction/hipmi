"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function job_getAllStatusPublish({
  page,
}: {
  page: number;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const userLoginId = await funGetUserIdByToken();

  const data = await prisma.job.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "1",
      authorId: userLoginId,
      isActive: true,
      isArsip: false,
    },
  });

  return data;
}
