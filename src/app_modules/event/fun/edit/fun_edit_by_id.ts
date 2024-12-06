"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { MODEL_EVENT } from "../../model/interface";

export async function Event_funEditById(data: MODEL_EVENT) {
  const updt = await prisma.event.update({
    where: {
      id: data.id,
    },
    data: {
      title: _.startCase(data.title),
      lokasi: data.lokasi,
      deskripsi: data.deskripsi,
      tanggal: data.tanggal,
      tanggalSelesai: data.tanggalSelesai,
      eventMaster_TipeAcaraId: data.EventMaster_TipeAcara.id as any,
    },
  });

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath(`/dev/event/detail/draft/`, "page");
  return {
    status: 200,
    message: "Berhasil Update",
  };
}
