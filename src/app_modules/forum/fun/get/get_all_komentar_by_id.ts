"use server";

import prisma from "@/lib/prisma";

export async function forum_funGetAllKomentarById({
  postingId,
  page,
}: {
  postingId: string;
  page: number;
}) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.forum_Komentar.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      forum_PostingId: postingId,
      isActive: true,
    },
    select: {
      id: true,
      isActive: true,
      komentar: true,
      createdAt: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              name: true,
              imageId: true,
            },
          },
        },
      },
      authorId: true,
    },
  });

  return data;
}
