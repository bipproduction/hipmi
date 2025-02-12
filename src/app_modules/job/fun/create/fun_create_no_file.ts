"use server";

import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";
import { MODEL_JOB } from "../../model/interface";

export async function job_funCreateNoFile({ data }: { data: MODEL_JOB }) {
  const authorId = await funGetUserIdByToken();

  const createNoImage = await prisma.job.create({
    data: {
      title: data.title,
      content: data.content,
      deskripsi: data.deskripsi,
      authorId: authorId,
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

  if (!createNoImage) return { status: 400, message: "Gagal Disimpan" };
  revalidatePath("/dev/job/main/status/2");
  return {
    status: 201,
    message: "Berhasil Disimpan",
    data: createNoImage,
  };
}
