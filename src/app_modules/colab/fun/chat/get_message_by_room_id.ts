"use server";

import prisma from "@/lib/prisma";
import _, { ceil } from "lodash";

export default async function colab_V2getListMessageByRoomId({
  roomId,
  page,
}: {
  roomId: string;
  page: number;
}) {
  // console.log(page);

  const lewat = page * 6 - 6;
  const ambil = 6;

  const awal = await prisma.projectCollaboration_Message.count({
    where: {
      isActive: true,
      User: {
        active: true,
      },
    },
  });

  const getData = await prisma.projectCollaboration_Message.findMany({
    skip: lewat,
    take: ambil,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
      User: {
        active: true,
      },
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
              name: true,
            },
          },
        },
      },
      userId: true,
    },
  });

  const allData = {
    data: _.reverse(getData),
    nPage: ceil(awal / ambil),
  };

  return allData;
}
