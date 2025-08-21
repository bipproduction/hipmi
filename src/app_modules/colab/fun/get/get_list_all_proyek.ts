"use server";

import prisma from "@/lib/prisma";

export default async function colab_getListAllProyek({
  page,
}: {
  page: number;
}) {
  const takeData = 3;
  const skipData = page * takeData - takeData;

  const data = await prisma.projectCollaboration.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      projectCollaborationMaster_StatusId: 1,
      isActive: true,
    },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      Author: {
        select: {
          id: true,
          Profile: true,
        },
      },
      ProjectCollaborationMaster_Industri: true,
      ProjectCollaboration_Partisipasi: {
        where: {
          isActive: true,
        },
      },
    },
  });

  return data;
}
