"use server";

import prisma from "@/lib/prisma";

export async function vote_getAllListPublish({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
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
      isArsip: false,
      isActive: true,
      akhirVote: {
        gte: new Date(),
      },
      title: {
        contains: search,
        mode: "insensitive",
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
        include: {
          Voting_Kontributor: {
            include: {
              Author: true,
            },
          },
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
