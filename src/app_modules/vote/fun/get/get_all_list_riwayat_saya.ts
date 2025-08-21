"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function Vote_getAllListRiwayatSaya({ page }: { page: number }) {
  const userLoginId = await funGetUserIdByToken();

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
      authorId: userLoginId as string,
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
