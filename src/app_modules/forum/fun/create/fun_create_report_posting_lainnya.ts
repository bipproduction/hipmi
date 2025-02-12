"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";


export async function forum_funCreateReportPostingLainnya(
  postingId: string,
  deskripsi: string
) {
  const userLoginId = await funGetUserIdByToken();
  const create = await prisma.forum_ReportPosting.create({
    data: {
      forum_PostingId: postingId,
      deskripsi: deskripsi,
      userId: userLoginId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambah report !" };
  return { status: 201, message: "Berhasil menambah report !" };
}
