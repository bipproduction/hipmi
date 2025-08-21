"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function forum_countOneTotalKomentarById(postingId: any) {
  const data = await prisma.forum_Komentar.count({
    where: {
      forum_PostingId: postingId,
      isActive: true,
    },
  });

  return data
}
