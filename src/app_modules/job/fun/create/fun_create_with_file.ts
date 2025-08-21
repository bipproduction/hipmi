"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";
import { MODEL_JOB } from "../../model/interface";

export async function job_funCreateWithFile({
  data,
  fileId,
}: {
  data: MODEL_JOB;
  fileId: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const createDataWithoutImg = await prisma.job.create({
    data: {
      title: data.title,
      content: data.content,
      deskripsi: data.deskripsi,
      authorId: userLoginId,
      imageId: fileId,
    },
    select: {
      id: true,
      authorId: true,
      MasterStatus: {
        select: {
          name: true,
        },
      },
      title: true,
    },
  });

  if (!createDataWithoutImg) return { status: 400, message: "Gagal Disimpan" };
  revalidatePath("/dev/job/main/status/2");
  return {
    data: createDataWithoutImg,
    status: 201,
    message: "Berhasil Disimpan",
  };
}
