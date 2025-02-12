"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminJob_funEditCatatanById(
  jobId: string,
  catatan: string
) {
  const udpt = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      masterStatusId: "4",
      catatan: catatan,
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



  if (!udpt) return { status: 400, message: "Gagal menambah catatan" };
  revalidatePath("/dev/admin/job/child/table_review");
  return {data: udpt, status: 200, message: "Berhasil menambah catatan" };
}
