"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Job_funEditStatusByStatusId(
  jobId: string,
  statusId: string
) {
  const updt = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      masterStatusId: statusId,
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

  if (!updt) return { status: 400, message: "Gagal ganti status" };
  revalidatePath("/dev/job/main/status");
  return { data: updt, status: 200, message: "Berhasil  ganti status" };
}
