"use server";

import prisma from "@/lib/prisma";
import { MODEL_EVENT } from "../../_lib/interface";
import { revalidatePath } from "next/cache";
import _ from "lodash";

export async function Event_funCreate(req: MODEL_EVENT) {
  try {
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

    if (!res) return { status: 400, message: "Gagal disimpan" };
    revalidatePath("/dev/event/main/status_page");
    return {
      data: res,
      status: 201,
      message: "Berhasil disimpan",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error create event",
    };
  }
}
