"use server";

import { prisma } from "@/app/lib";
import _ from "lodash";

export async function notifikasi_funVotingCheckStatus({ id }: { id: string }) {
  const data = await prisma.voting.findUnique({
    where: {
      id: id,
    },
    select: {
      Voting_Status: true,
    },
  });

  if (!data)
    return { status: 400, message: "Job tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Berhasil di cek",
    statusName: _.lowerCase(data.Voting_Status?.name),
  };
}
