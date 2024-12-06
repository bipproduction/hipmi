"use server";

import { prisma } from "@/app/lib";

export async function event_funUpdateKehadiran({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  const updt = await prisma.event_Peserta.updateMany({
    where: {
      userId: userId,
      eventId: eventId,
    },
    data: {
      isPresent: true,
    },
  });

  if(!updt) return { status: 400, message: "Gagal Update" };
  return { status: 200, message: "Anda telah terkonfirmasi" };
}
