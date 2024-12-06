"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function event_getOneById(eventId: string) {
  const data = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    include: {
      Author: {
        include: {
          Profile: true,
        },
      },
      EventMaster_Status: true,
      EventMaster_TipeAcara: true,
      // Event_Peserta: true,
    },
  });

  revalidatePath("/dev/event/detail/draft/");

  return data;
}
