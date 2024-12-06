"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_EVENT_PESERTA } from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Event_funJoinAndConfirmEvent(data: MODEL_EVENT_PESERTA) {
  const join = await prisma.event_Peserta.create({
    data: {
      eventId: data.eventId,
      userId: data.userId,
      isPresent: true,
    },
  });

  if (!join) return { status: 400, message: "Gagal Join & Konfirmasi" };

  revalidatePath("/dev/event/detail/main");
  return {
    status: 200,
    message: "Berhasil Join & Konfirmasi",
  };
}
