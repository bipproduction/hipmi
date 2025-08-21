"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function colab_getListNotifikasiByUserId() {
  const userLoginId = await funGetUserIdByToken();

  const get = await prisma.projectCollaboration_Notifikasi.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userLoginId as string,
    },
    select: {
      id: true,
      createdAt: true,
      isRead: true,
      note: true,
      ProjectCollaboration: {
        select: {
          id: true,
          report: true,
        },
      },
    },
  });

  return get;
}
