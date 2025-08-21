"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditActivationTipeAcaraById(id: number) {
  const updt = await prisma.eventMaster_TipeAcara.update({
    where: {
      id: id,
    },
    data: {
      active: false,
    },
  });

  if(!updt) return {status: 400, message: "Gagal Update"}
  revalidatePath("/dev/admin/event/child/tipe_acara");
  return {
    status: 200,
    message: "Update Berhasil"
  }
}
