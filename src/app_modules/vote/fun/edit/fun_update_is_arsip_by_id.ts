"use server";

import prisma from "@/lib/prisma";
import { RouterVote } from "@/lib/router_hipmi/router_vote";
import { revalidatePath } from "next/cache";

export async function voting_funUpdateIsArsipById({
  votingId,
  isArsip,
}: {
  votingId: string;
  isArsip: boolean;
}) {
  const updt = await prisma.voting.update({
    where: {
      id: votingId,
    },
    data: {
      isArsip: isArsip,
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update" };
  revalidatePath(RouterVote.main_detail);
  revalidatePath(RouterVote.detail_publish);

  return { status: 200, message: "Berhasil Update" };
}
