"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function vote_getAllListKontribusiByAuthorId({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.voting_Kontributor.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: userLoginId,
    },
    select: {
      id: true,
      Voting: {
        select: {
          id: true,
          title: true,
          isActive: true,
          awalVote: true,
          akhirVote: true,
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
            },
          },
          Author: {
            select: {
              Profile: true,
            },
          },
        },
      },
      Voting_DaftarNamaVote: true,
      Author: true,
    },
  });
  return data;
}
