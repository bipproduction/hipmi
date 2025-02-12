"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function Vote_cekKontributorById(votingId: string) {
  const userLoginId = await funGetUserIdByToken();

  const cek = await prisma.voting_Kontributor.count({
    where: {
      authorId: userLoginId,
      votingId: votingId,
    },
  });

  if (cek > 0) {
    return true;
  } else {
    return false;
  }
}
