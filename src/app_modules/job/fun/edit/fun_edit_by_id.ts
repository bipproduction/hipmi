"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MODEL_JOB } from "../../model/interface";

export async function job_EditById({
  data,
  fileId,
}: {
  data: MODEL_JOB;
  fileId?: string;
}) {
  if (fileId == undefined) {
    const updt = await prisma.job.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        deskripsi: data.deskripsi,
      },
    });
    if (!updt) return { status: 400, message: "Gagal Update" };
    revalidatePath("/dev/job/detail/draft");

    return {
      status: 200,
      message: "Berhasil Update",
    };
  } else {
    const updtWithFile = await prisma.job.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        deskripsi: data.deskripsi,
        imageId: fileId,
      },
    });
    if (!updtWithFile) return { status: 400, message: "Gagal Update" };
    revalidatePath("/dev/job/detail/draft");

    return {
      status: 200,
      message: "Berhasil Update",
    };
  }
}
