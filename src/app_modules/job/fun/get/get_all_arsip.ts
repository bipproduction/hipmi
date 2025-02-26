"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function job_getAllArsipById({ page }: { page: number }) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const get = await prisma.job.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: userLoginId,
      isArsip: true,
      isActive: true,
    },
  });

  return get;
}
