"use server";

import prisma from "@/lib/prisma";

export default async function colab_getListPartisipanByColabId(colabId: string) {
  const data = await prisma.projectCollaboration_Partisipasi.findMany({
    where: {
      projectCollaborationId: colabId,
      isActive: true
    },
    select: {
      id: true,
      User: {
        select: {
          id: true,
          Profile: true,
        },
      },
      deskripsi_diri: true
    },
  });

  return data
}
