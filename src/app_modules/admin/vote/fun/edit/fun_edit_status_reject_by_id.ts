"use server";

import prisma from "@/lib/prisma";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditCatatanById(
  data: MODEL_VOTING,
) {
  const updt = await prisma.voting.update({
    where: {
      id: data.id,
    },
    data: {
      voting_StatusId: "4",
      catatan: data.catatan,
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
    }
  });

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath("/dev/admin/event/main");
  return {
    data: updt,
    status: 200,
    message: "Berhasil Update Status",
  };
}
