"use server";

import prisma from "@/lib/prisma";

export default async function colab_getListAnggotaByRoomId(roomId: string) {
  const get = await prisma.projectCollaboration_RoomChat.findFirst({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      name: true,
      ProjectCollaboration: {
        select: {
          id: true,
          isActive: true,
          title: true,
          lokasi: true,
          purpose: true,
          benefit: true,
          createdAt: true,
          ProjectCollaborationMaster_Industri: true,
        },
      },
      ProjectCollaboration_AnggotaRoomChat: {
        select: {
          User: {
            select: {
              id: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                  imageId: true
                },
              },
            },
          },
        },
      },
    },
  });

  return get;
}
