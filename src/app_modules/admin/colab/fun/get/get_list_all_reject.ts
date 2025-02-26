"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";

export default async function adminColab_getListAllRejected({
  page,
}: {
  page: number;
}) {
  const lewat = page * 5 - 5;
  const ambil = 5;

  const dataAwal = await prisma.projectCollaboration.count({
    where: {
      isActive: false,
      isReject: true,
      Author: {
        active: true,
      },
    },
  });

  const getData = await prisma.projectCollaboration.findMany({
    skip: lewat,
    take: ambil,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      isActive: false,
      isReject: true,
      Author: {
        active: true,
      },
    },
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      title: true,
      report: true,
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
        select: {
          id: true,
          User: {
            select: {
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const allData = {
    data: getData,
    nPage: _.ceil(dataAwal / ambil),
  };

  return allData
}
