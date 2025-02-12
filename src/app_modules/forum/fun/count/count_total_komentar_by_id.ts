"use server";

import prisma from "@/lib/prisma";

// PERCOBAAN
export async function forum_countTotalKomenById(postingId: string) {
  // console.log(postingId)

  const get = await prisma.forum_Komentar.count({
    where: {
      forum_PostingId: postingId,
      isActive: true,
    },

  });

  // console.log(get);

  return get;
}
