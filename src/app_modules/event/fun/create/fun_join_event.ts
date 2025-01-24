"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_EVENT_PESERTA } from "../../_lib/interface";
import { revalidatePath } from "next/cache";

export async function Event_funJoinEvent(data: MODEL_EVENT_PESERTA) {
  const res = await prisma.event_Peserta.create({
    data: {
      eventId: data.eventId,
      userId: data.userId,
    },

    select: {
      Event: {
        select: {
          id: true,
          title: true,
          authorId: true,
        },
      },
    },
  });

  if (!res) return { status: 400, message: "Gagal Join" };
  revalidatePath("/dev/event/detail/main");
  return {
    data: res,
    status: 200,
    message: "Berhasil Join",
  };
}
