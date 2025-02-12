"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Job_funEditArsipById(jobId: string, aktifasi: boolean) {
  const updt = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      isArsip: aktifasi,
    },
  });
  if (!updt) return { status: 400, message: "Gagal Arsip" };

  revalidatePath("/dev/job/main/arsip");
  revalidatePath("/dev/job/main/status");
  revalidatePath("/dev/job/main/beranda");
  return { status: 200, message: "Berhasil Arsip" };
}
