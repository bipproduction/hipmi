"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function admin_funVotingCheckStatus({ id }: { id: string }) {
  const data = await prisma.voting.findUnique({
    where: {
      id: id,
    },
    select: {
      Voting_Status: true,
    },
  });

  if (!data)
    return { status: 400, message: "Id tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Id ditemukan",
    statusName: _.lowerCase(data.Voting_Status?.name),
  };
}
