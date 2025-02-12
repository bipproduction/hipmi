"use server";

import prisma from "@/lib/prisma";

export default async function colab_getOneNotifikasiById({
  notifId,
}: {
  notifId: string;
}) {
  const get = await prisma.projectCollaboration_Notifikasi.findFirst({
    where: {
      id: notifId,
    },
    select: {
      id: true,
      createdAt: true,
      note: true,
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
      },
    },
  });

  return get;
}
