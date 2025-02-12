"use server";

import prisma from "@/lib/prisma";

export async function Event_CekUserJoinById(eventId: string, userId: string) {
  const cek = await prisma.event_Peserta.count({
    where: {
      eventId: eventId,
      userId: userId,
    },
  });

  if (cek > 0) {
    return true;
  } else {
    return false;
  }
}
