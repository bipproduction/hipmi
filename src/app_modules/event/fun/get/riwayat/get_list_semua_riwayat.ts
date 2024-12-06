"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";

export async function event_getListSemuaRiwayat({ page }: { page: number }) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      tanggal: "desc",
    },
    where: {
      eventMaster_StatusId: "1",
      isArsip: true,
    },
    select: {
      id: true,
      title: true,
      tanggal: true,
      deskripsi: true,
      active: true,
      authorId: true,
      Author: {
        select: {
          Profile: true,
        },
      },
    },
  });

  return data;
}
