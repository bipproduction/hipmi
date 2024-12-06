"use server";

import prisma from "@/app/lib/prisma";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_peringatan";
import { ceil } from "lodash";
import moment from "moment";

export async function adminEvent_funGetListPublish({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const getAllData = await prisma.event.findMany({
    where: {
      active: true,
      eventMaster_StatusId: "1",
      isArsip: false,
    },
  });

  for (let i of getAllData) {
    if (moment(i.tanggalSelesai).diff(moment(), "minutes") < 0) {
      await prisma.event.update({
        where: {
          id: i.id,
        },
        data: {
          isArsip: true,
        },
      });
    }
  }

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
      isArsip: false,
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
      isArsip: false,
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
