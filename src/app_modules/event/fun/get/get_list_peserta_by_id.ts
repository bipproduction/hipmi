"use server";

import prisma from "@/app/lib/prisma";

export async function Event_getListPesertaById(eventId: string) {
  const data = await prisma.event_Peserta.findMany({
    where: {
      eventId: eventId,
    },
    select: {
      id: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      userId: true,

      isPresent: true,
      User: {
        select: {
          Profile: true,
        },
      },
      Event: true,
      eventId: true,
    },
  });

  return data;
}
