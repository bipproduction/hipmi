"use server";

import prisma from "@/app/lib/prisma";

export async function Vote_getOnebyId(voteId: string) {
  const data = await prisma.voting.findFirst({
    where: {
      id: voteId,
    },
    select: {
      id: true,
      title: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      deskripsi: true,
      awalVote: true,
      akhirVote: true,
      catatan: true,
      authorId: true,
      voting_StatusId: true,
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
