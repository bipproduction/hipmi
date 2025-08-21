"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function Vote_getOnePilihanVotingByUserId(votingId: string) {
  const userLoginId = await funGetUserIdByToken();

  const get = await prisma.voting_Kontributor.findFirst({
    where: {
      authorId: userLoginId,
      votingId: votingId,
    },
    select: {
      Voting_DaftarNamaVote: {
        select: {
          value: true,
        },
      },
    },
  });

  return get;
}
