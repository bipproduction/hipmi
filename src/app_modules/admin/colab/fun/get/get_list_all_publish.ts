"use server";

import prisma from "@/lib/prisma";
import _, { ceil } from "lodash";

export default async function adminColab_getListAllPublish({
  page,
}: {
  page: number;
}) {
  const lewat = page * 5 - 5;
  const ambil = 5;

  const awal = await prisma.projectCollaboration.count({
    where: {
      isActive: true,
      isReject: false,
      Author: {
        active: true,
      },
    },
  });

  const getData = await prisma.projectCollaboration.findMany({
    skip: lewat,
    take: ambil,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
      isReject: false,
      Author: {
        active: true,
      },
    },
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      title: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: true,
        },
      },
      projectCollaborationMaster_IndustriId: true,
      ProjectCollaborationMaster_Industri: true,
      ProjectCollaboration_Partisipasi: {
        where: {
          User: {
            active: true,
          },
        },
        // select: {
        //   User: {
        //     select: {
        //       id: true,
        //       username: true,
        //       Profile: true,
        //     },
        //   },
        // },
      },
    },
  });

  const allData = {
    data: getData,
    nPage: ceil(awal / ambil),
  };

  return allData;
}
