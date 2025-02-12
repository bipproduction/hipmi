"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Vote_funEditStatusByStatusId(
  voteId: string,
  statusId: string
) {
  // if (statusId !== "2") {
  //   const checkStatus = await prisma.voting.findFirst({
  //     where: {
  //       id: voteId,
  //     },
  //   });

  //   if (checkStatus?.voting_StatusId != "2")
  //     return { status: 400, message: "Status sudah diubah admin" };
  // }

  const updt = await prisma.voting.update({
    where: {
      id: voteId,
    },
    data: {
      voting_StatusId: statusId,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      Voting_Status: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update" };
  revalidatePath("/dev/vote/main/status");
  return {
    data: updt,
    status: 200,
    message: "Update Berhasil",
  };
}
