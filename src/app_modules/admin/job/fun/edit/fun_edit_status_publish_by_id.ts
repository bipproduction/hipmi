"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminJob_funEditStatusPublishById(jobId: string) {
  const updt = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      masterStatusId: "1",
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


  if(!updt) return {status: 400, message: "Update Gagal"}
  revalidatePath("/dev/admin/job/child/table_review");
  return {data: updt, status: 200, message: "Berhasil Update"}
}
