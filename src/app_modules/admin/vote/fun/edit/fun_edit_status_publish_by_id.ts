"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminVote_funEditStatusPublishById(voteId: string) {
  const updt = await prisma.voting.update({
    where: {
      id: voteId,
    },
    data: {
      voting_StatusId: "1",
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

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath("/dev/admin/vote/main");

  return {
    data: updt,
    status: 200,
    message: "Berhasil Update Status",
  };
}
