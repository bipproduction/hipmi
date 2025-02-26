"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export default async function adminColab_getListAllGroupChat({
  page,
}: {
  page: number;
}) {
  const lewat = page * 5 - 5;
  const ambil = 5;

  const dataAwal = await prisma.projectCollaboration_RoomChat.count({
    where: {
      isActive: true,
    },
  });

  const getData = await prisma.projectCollaboration_RoomChat.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
    },
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      name: true,
      ProjectCollaboration_AnggotaRoomChat: {
        select: {
          User: {
            select: {
              id: true,
              Profile: true,
            },
          },
        },
      },
      ProjectCollaboration: {
        select: {
          id: true,
          isActive: true,
          title: true,
          lokasi: true,
          purpose: true,
          benefit: true,
          createdAt: true,
          report: true,
          Author: {
            select: {
              id: true,
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          ProjectCollaborationMaster_Industri: true,
        },
      },
    },
  });

  const allData = {
    data: getData,
    nPage: ceil(dataAwal / ambil)
  }

  return allData;
}
