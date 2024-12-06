"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function event_getListRiwayatSaya({ page }: { page: number }) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      tanggal: "desc",
    },
    where: {
      authorId: userLoginId,
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
