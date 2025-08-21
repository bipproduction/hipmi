"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function adminForum_funDeleteKomentarById(komentarId: string) {
  const delTemporary = await prisma.forum_Komentar.update({
    where: {
      id: komentarId,
    },
    data: {
      isActive: false,
    },
  });

  if (!delTemporary) return { status: 400, message: "Gagal Dihapus" };
  return { status: 200, message: "Berhasil Dihapus" };
}
