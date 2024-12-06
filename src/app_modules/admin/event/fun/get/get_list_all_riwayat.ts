"use server";

import prisma from "@/app/lib/prisma";
import _, { ceil } from "lodash";

export async function adminEvent_funGetListAllRiwayat({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  let takeData = 10;
  let skipData = page * takeData - takeData;

  const data = await prisma.event.findMany({
    skip: skipData,
    take: takeData,
    orderBy: {
      tanggal: "desc",
    },
    where: {
      eventMaster_StatusId: "1",
      isArsip: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      Author: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              name: true,
            },
          },
        },
      },
      EventMaster_Status: true,
      EventMaster_TipeAcara: true,
    },
  });

  const nCount = await prisma.event.count({
    where: {
      eventMaster_StatusId: "1",
      isArsip: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
