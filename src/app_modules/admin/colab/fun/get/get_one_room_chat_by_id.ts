"use server";

import prisma from "@/lib/prisma";

export default async function adminColab_getOneRoomChatById({
  roomId,
}: {
  roomId: string;
}) {
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
                },
              },
            },
          },
        },
      },
    },
  });

  if (!get) return { status: 400, message: "Gagal ambil data" };
  return {data: get, status: 200, message: "Berhasil ambil data" };
}
