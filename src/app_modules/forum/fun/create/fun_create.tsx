"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";
export async function forum_funCreate(value: string) {
  const userLoginId = await funGetUserIdByToken();

  const create = await prisma.forum_Posting.create({
    data: {
      diskusi: value,
      authorId: userLoginId,
      forumMaster_StatusPostingId: 1,
    },
  });

  if (!create) return { status: 400, message: "Gagal  memposting" };
  revalidatePath("/dev/forum/main");
  return { status: 201, message: "Berhasil memposting" };
}
