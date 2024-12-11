"use server";

import prisma from "@/app/lib/prisma";

export async function event_newGetListPesertaById({
  eventId,
  page,
}: {
  eventId: string;
  page: number;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event_Peserta.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
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
