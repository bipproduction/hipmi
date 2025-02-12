"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";

export async function forum_funCreateKomentar(
  postingId: string,
  komentar: string
) {
  const userLoginId = await funGetUserIdByToken();

  const create = await prisma.forum_Komentar.create({
    data: {
      komentar: komentar,
      forum_PostingId: postingId,
      authorId: userLoginId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan komentar" };
  revalidatePath("/dev/forum/detail");
  return { status: 201, message: "Berhasil menambahkan komentar" };
}
