"use server";

import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function vote_funGetAllByStatusId({
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
    const data = await prisma.voting.findMany({
      take: takeData,
      skip: skipData,
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: "1",
        authorId: userLoginId as string,
        isActive: true,
        akhirVote: {
          gte: new Date(),
        },
      },
      include: {
        Voting_DaftarNamaVote: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return data;
  } else {
    const data = await prisma.voting.findMany({
      take: takeData,
      skip: skipData,
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: statusId,
        authorId: userLoginId as string,
        isActive: true,
      },
    });

    return data;
  }
}
