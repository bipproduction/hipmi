"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function forum_funCreateReportKomentar({
  komentarId,
  kategoriId,
}: {
  komentarId: string;
  kategoriId: any;
}) {
  const userLoginId = await funGetUserIdByToken();

  if (!userLoginId)
    return { status: 400, message: "Gagal menambahkan report komentar !" };

  try {
    const createReport = await prisma.forum_ReportKomentar.create({
      data: {
        userId: userLoginId,
        forumMaster_KategoriReportId: kategoriId,
        forum_KomentarId: komentarId,
      },
    });

    if (!createReport)
      return { status: 400, message: "Gagal menambahkan report komentar !" };

    return { status: 201, message: "Berhasil me-report komentar !" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error API",
      error: (error as Error).message,
    };
  }

}
