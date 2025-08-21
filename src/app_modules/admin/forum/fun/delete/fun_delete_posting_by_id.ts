"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function adminForum_funDeletePostingById(postingId: string) {
  const delTemporary = await prisma.forum_Posting.update({
    where: {
      id: postingId,
    },
    data: {
      isActive: false,
    },
  });

  if (!delTemporary) return { status: 400, message: "Gagal Dihapus" };
  revalidatePath("/dev/admin/forum/child/publish");
  return { status: 200, message: "Berhasil Dihapus" };
}
