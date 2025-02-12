"use server";

import prisma from "@/lib/prisma";

export default async function adminColab_getOneByColabId({
  id,
}: {
  id: string;
}) {
  const getData = await prisma.projectCollaboration.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      createdAt: true,
      Author: {
        select: {
          id: true,
          Profile: true,
        },
      },
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
              id: true,
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

  if (!getData) return { status: 400, message: "Gagal " };
  return { data: getData, status: 200, message: " Berhasil" };
}
