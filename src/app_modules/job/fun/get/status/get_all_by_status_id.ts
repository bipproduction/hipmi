"use server";

import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function job_funGetAllByStatusId({
  page,
  statusId,
}: {
  page: number;
  statusId: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  if (statusId == "1") {
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
  } else {
    const data = await prisma.job.findMany({
      take: takeData,
      skip: skipData,
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: statusId,
        authorId: userLoginId,
        isActive: true,
      },
    });

    return data;
  }
}
