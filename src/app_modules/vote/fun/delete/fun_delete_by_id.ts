"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * @param votingId
 */
export async function Vote_funDeleteById(votingId: string) {
  const del = await prisma.voting.delete({
    where: {
      id: votingId,
    },
    select: {
      Voting_DaftarNamaVote: true,
    },
  });
  if (!del) return { status: 400, message: "Gagal Hapus Data" };

  for (let i of del.Voting_DaftarNamaVote) {
    const hapusDaftarPilihan = await prisma.voting_DaftarNamaVote.delete({
      where: {
        id: i.id,
      },
    });

    if (!hapusDaftarPilihan)
      return { status: 400, message: "Gagal Hapus Daftar Pilihan" };
  }

  revalidatePath("/dev/vote/main/status/3");
  revalidatePath("/dev/vote/main/status/4");

  return {
    status: 200,
    message: "Hapus Berhasil",
  };
}
