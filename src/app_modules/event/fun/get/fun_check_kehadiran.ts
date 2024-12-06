"use server";

import { prisma } from "@/app/lib";

export async function event_funCheckKehadiran({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  const checkKehadiran = await prisma.event_Peserta.findFirst({
    where: {
      userId: userId,
      eventId: eventId,
    },
    select: {
      isPresent: true,
    },
  });

  if (checkKehadiran?.isPresent) {
    return true;
  } else {
    return false;
  }
}
