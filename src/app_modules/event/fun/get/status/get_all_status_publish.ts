"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function event_funGetAllStatusPublish({ page }: { page: number }) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      active: true,
      eventMaster_StatusId: "1",
      authorId: userLoginId,
      isArsip: false,
    },
    select: {
      id: true,
      title: true,
      deskripsi: true,
      tanggal: true,
    },
  });

  return data;
}
