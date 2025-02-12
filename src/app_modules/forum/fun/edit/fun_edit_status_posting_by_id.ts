"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function forum_funEditStatusPostingById(
  postingId: string,
  statusId: number
) {
  const updt = await prisma.forum_Posting.update({
    where: {
      id: postingId,
    },
    data: {
      forumMaster_StatusPostingId: statusId,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update posting" };
  revalidatePath("/dev/forum/main");
  revalidatePath("/dev/forum/detail");
  revalidatePath("/dev/forum/forumku");
  return { status: 200, message: "Berhasil update posting" };
}
