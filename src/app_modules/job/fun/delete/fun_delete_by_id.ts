"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Job_funDeleteById(jobId: string) {
  const del = await prisma.job.delete({
    where: {
      id: jobId,
    },
  });

  if (!del) return { status: 400, message: "Gagal hapus" };
  revalidatePath("/dev/job/main/status/");
  return { status: 200, message: "Berhasil hapus" };
}
