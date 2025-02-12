"use server";

import prisma from "@/lib/prisma";

export default async function colab_getOneCollaborationById(colabId: string) {
  const data = await prisma.projectCollaboration.findFirst({
    where: {
      id: colabId,
    },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      createdAt: true,
      // jumlah_partisipan: true,
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
