"use server";

import prisma from "@/lib/prisma";

export default async function adminForum_countKomentarByPostingId({
  postingId,
}: {
  postingId: string;
}) {
  const count = await prisma.forum_Komentar.count({
    where: {
      isActive: true,
      forum_PostingId: postingId,
    },
  });
  

  return count;
}
