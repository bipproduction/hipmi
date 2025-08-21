"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";

export async function Vote_funCreateHasil({
  pilihanVotingId,
  votingId,
}: {
  pilihanVotingId: string;
  votingId: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const get = await prisma.voting_DaftarNamaVote.findFirst({
    where: {
      id: pilihanVotingId,
    },
    select: {
      jumlah: true,
      value: true,
    },
  });

  if (!get) return { status: 400, message: "Gagal Voting" };

  const updt = await prisma.voting_DaftarNamaVote.update({
    where: {
      id: pilihanVotingId,
    },
    data: {
      jumlah: get.jumlah + 1,
    },
  });
  if (!updt) return { status: 400, message: "Gagal Update" };

  const createKontributor = await prisma.voting_Kontributor.create({
    data: {
      voting_DaftarNamaVoteId: pilihanVotingId,
      votingId: votingId,
      authorId: userLoginId,
    },
    select: {
      Voting: {
        select: {
          id: true,
          title: true,
          authorId: true,
        },
      },
    },
  });

  if (!createKontributor)
    return { status: 400, message: "Gagal Menjadi Kontributor" };
  revalidatePath("/dev/vote/detail/main/");
  return {
    data: createKontributor,
    pilihan: get.value,
    status: 201,
    message: "Berhasil Voting",
  };
}
