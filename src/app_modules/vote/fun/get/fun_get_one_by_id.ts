"use server";

import prisma from "@/lib/prisma";

export async function voting_funGetOneVotingbyId(voteId: string) {
  const data = await prisma.voting.findFirst({
    where: {
      id: voteId,
    },
    include: {
      Voting_DaftarNamaVote: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          isActive: true,
        },
      },
      Author: {
        select: {
          Profile: true,
        },
      },
    },
  });

  return data;
}
