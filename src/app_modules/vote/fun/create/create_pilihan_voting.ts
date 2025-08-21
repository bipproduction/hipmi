"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";

export async function Vote_funCreatePilihanVotingById(
  namaVotingId: string,
  votingId: string
) {
  const userLoginId = await funGetUserIdByToken();

  const create = await prisma.voting_Kontributor.create({
    data: {
      voting_DaftarNamaVoteId: namaVotingId,
      votingId: votingId,
      authorId: userLoginId,
    },
  });

  if (!create) return { status: 400, message: "Gagal Voting" };
  revalidatePath("/dev/vote/detail/main/");
  return { status: 201, message: "Berhasil Voting" };
}
