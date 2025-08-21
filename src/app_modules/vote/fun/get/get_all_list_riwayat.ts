"use server"

import prisma from "@/lib/prisma"

export async function vote_getAllListRiwayat({ page }: { page: number }) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.voting.findMany({
    take: takeData,
    skip: skipData,
    
    orderBy: {
      createdAt: "asc",
    },
    where: {
      voting_StatusId: "1",
      isActive: true,
      akhirVote: {
        lte: new Date(),
      },
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
      },
      Author: {
        select: {
          id: true,
          username: true,
          nomor: true,
          Profile: true,
        },
      },
    },
  });

  return data;
}