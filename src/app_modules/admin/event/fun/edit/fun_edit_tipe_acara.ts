"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditTipeAcara(id: number, name: string) {
  const updt = await prisma.eventMaster_TipeAcara.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  if(!updt) return {status: 400, message: "Gagal Update"}
  revalidatePath("/dev/admin/event/detail/tipe_acara")
  return {
    status: 200,
    message: "Update Berhasil"
  }
}
