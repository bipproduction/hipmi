"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function forum_funDeleteKomentarById(komentarId: string) {
  const del = await prisma.forum_Komentar.update({
    where: {
      id: komentarId,
    },
    data: {
      isActive: false,
    },
  });

  if (!del) return { status: 400, message: "Gagal Dihapus" };
  revalidatePath("/dev/forum/detail");
  return { status: 200, message: "Berhasil Dihapus" };
}
