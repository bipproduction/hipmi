"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminVote_funEditCatatanRejectById(
  voteId: string,
  catatan: string
) {
  const updt = await prisma.voting.update({
    where: {
      id: voteId,
    },
    data: {
      catatan: catatan,
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update Catatan" };
  revalidatePath("/dev/admin/vote/child/table_reject");
  return { status: 200, message: "Berhasil Update Catatan" };
}
