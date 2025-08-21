"use server";

import prisma from "@/lib/prisma";
import { RouterColab } from "@/lib/router_hipmi/router_colab";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export default async function colab_getMessageByRoomId({
  roomId,
  page,
}: {
  roomId: string;
  page: number;
}) {
  const ambil = 10;
  const lewat = page * ambil - ambil;

  const getList = await prisma.projectCollaboration_Message.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: lewat,
    take: ambil,
    where: {
      projectCollaboration_RoomChatId: roomId,
    },
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      message: true,
      isFile: true,
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
  });

  const reverse = _.reverse(getList);

  return reverse;
}
