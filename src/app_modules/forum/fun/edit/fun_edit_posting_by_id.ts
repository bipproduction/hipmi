"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function forum_funEditPostingById(
  postingId: string,
  diskusi: string
) {
  const updt = await prisma.forum_Posting.update({
    where: {
      id: postingId,
    },
    data: {
      diskusi: diskusi,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update" };
  revalidatePath("/dev/forum/main");
  return { status: 200, message: "Berhasil update" };
}
