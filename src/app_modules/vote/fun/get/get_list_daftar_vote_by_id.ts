"use server";

import prisma from "@/lib/prisma";

export async function Vote_getListDaftarNamaById(voteId: string) {
  const data = await prisma.voting_DaftarNamaVote.findMany({
    where: {
      votingId: voteId,
      isActive: true,
    },
  });

  return data;
}
