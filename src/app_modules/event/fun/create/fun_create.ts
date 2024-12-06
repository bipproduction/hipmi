"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_EVENT } from "../../model/interface";
import { revalidatePath } from "next/cache";
import _ from "lodash";

export async function Event_funCreate(req: MODEL_EVENT) {
  const res = await prisma.event.create({
    data: {
      title: _.startCase(req.title),
      lokasi: req.lokasi,
      deskripsi: req.deskripsi,
      eventMaster_TipeAcaraId: req.eventMaster_TipeAcaraId,
      tanggal: req.tanggal,
      tanggalSelesai: req.tanggalSelesai,
      authorId: req.authorId,
    },
    select: {
      id: true,
      title: true,
      EventMaster_Status: {
        select: {
          name: true,
        },
      },
      authorId: true,
    },
  });

  if (!res) return { status: 400, message: "Gagal Disimpan" };
  revalidatePath("/dev/event/main/status_page");
  return {
    data: res,
    status: 201,
    message: "Berhasil Disimpan",
  };
}
