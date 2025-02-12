"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";


export async function forum_funCreateReportPosting({
  postingId,
  kategoriId,
}: {
  postingId: string;
  kategoriId: number;
}) {
    const userLoginId = await funGetUserIdByToken();


  const createReport = await prisma.forum_ReportPosting.create({
    data: {
      userId: userLoginId,
      forum_PostingId: postingId,
      forumMaster_KategoriReportId: kategoriId,
    },
  });

  if (!createReport)
    return { status: 400, message: "Gagal menambahkan report posting!" };
  return { status: 201, message: "Berhasil me-report posting!" };
}
