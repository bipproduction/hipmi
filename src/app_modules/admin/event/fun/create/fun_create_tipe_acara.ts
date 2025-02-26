"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funCreateTipeAcara(name: string) {
  const dataAwal = await prisma.eventMaster_TipeAcara.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const res = await prisma.eventMaster_TipeAcara.create({
    data: {
      id: Number(dataAwal?.id) + 1,
      name: name,
    },
  });

  if (!res) return { status: 400, message: "Gagal Menambahkan" };
  revalidatePath("/dev/admin/event/detail/tipe_acara");
  return {
    status: 201,
    message: "Berhasil Menambahkan",
  };
}
