"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function colab_getListRoomChatByAuthorId({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const listRoom = await prisma.projectCollaboration_AnggotaRoomChat.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userLoginId as string,
    },
    select: {
      ProjectCollaboration_RoomChat: {
        select: {
          id: true,
          name: true,
          isActive: true,
          ProjectCollaboration_AnggotaRoomChat: {
            select: {
              User: true,
            },
          },
        },
      },
    },
  });

  // console.log(listRoom);

  return listRoom;
}
