"use server";

import prisma from "@/lib/prisma";

export async function Event_countTotalPesertaById(eventId: string) {
  const data = await prisma.event_Peserta.count({
    where: {
      eventId: eventId,
    },
  });

  return data;
}
