"use server";

import prisma from "@/app/lib/prisma";
import { ceil } from "lodash";

export async function adminEvent_getListPesertaById({
  eventId,
  page,
  search,
}: {
  eventId: string;
  page: number;
  search?: string;
}) {
  let takeData = 10;
  let skipData = page * takeData - takeData;

  const data = await prisma.event_Peserta.findMany({
    skip: skipData,
    take: takeData,
    where: {
      eventId: eventId,
    },
    select: {
      isPresent: true,
      User: {
        include: {
          Profile: true,
        },
      },
    },
  });

  const nCount = await prisma.event_Peserta.count({
    where: {
      eventId: eventId,
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
