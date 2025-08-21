"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function vote_getAllPublish({ page }: { page: number }) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 5;
  const skipData = page * takeData - takeData;

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
}
