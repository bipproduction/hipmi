"use server";

import { prisma } from "@/app/lib";

export async function event_funCheckPesertaByUserId({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  const check = await prisma.event_Peserta.findFirst({
    where: {
      userId: userId,
      eventId: eventId,
    },
  });

  if (check != null) {
    return true;
  } else {
    return false;
  }
}
