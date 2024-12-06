"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import moment from "moment";

export async function event_getListAllPublish({ page }: { page: number }) {
  const allData = await prisma.event.findMany({
    where: {
      active: true,
      eventMaster_StatusId: "1",
      isArsip: false,
    },
  });

  for (let i of allData) {
    if (moment(i.tanggalSelesai).diff(moment(), "minutes") < 0) {
      const updateArsip = await prisma.event.update({
        where: {
          id: i.id,
        },
        data: {
          isArsip: true,
        },
      });

      if (!updateArsip) {
        console.log("gagal update arsip");
        return [];
      }
    }
  }

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event.findMany({
    take: takeData,
    skip: skipData,

    orderBy: [
      {
        tanggal: "asc",
      },
    ],
    where: {
      active: true,
      eventMaster_StatusId: "1",
      isArsip: false,
    },
    include: {
      Author: {
        include: {
          Profile: true,
        },
      },
    },
  });

  return data;
}
