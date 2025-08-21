"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";

export async function forum_funCreateReportKomentarLainnya(
  komentarId: string,
  deskripsi: string
) {
  try {
    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId)
      return { status: 400, message: "Gagal menambah report !" };

    const create = await prisma.forum_ReportKomentar.create({
      data: {
        forum_KomentarId: komentarId,
        deskripsi: deskripsi,
        userId: userLoginId,
      },
    });

    if (!create) return { status: 400, message: "Gagal menambah report !" };
    return { status: 201, message: "Berhasil menambah report !" };
  } catch (error) {
    backendLogger.error("Error create report komentar lainnya", error);
    return {
      status: 500,
      message: "Error API",
      error: (error as Error).message,
    };
  }
}
