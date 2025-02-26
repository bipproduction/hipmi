"use server";

import prisma from "@/lib/prisma";

export default async function adminForum_funGetOneKomentarById({
  komentarId,
}: {
  komentarId: string;
}) {

  const data = await prisma.forum_Komentar.findFirst({
    where: {
      id: komentarId,
    },
    select: {
      id: true,
      isActive: true,
      authorId: true,
      Author: {
        select: {
          id: true,
          username: true,
        },
      },
      komentar: true,
      forum_PostingId: true,
    },
  });

  return data;
}
