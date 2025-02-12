"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function colab_getListByStatusId(statusId: number) {
  const userLoginId = await funGetUserIdByToken();

  const data = await prisma.projectCollaboration.findMany({
    where: {
      userId: userLoginId,
      projectCollaborationMaster_StatusId: statusId,
    },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      Author: {
        select: {
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

  if (!data) return { status: 400, message: "Gagal Mengambil data" };

  return { data: data, status: 200, message: "Berhasil mengambil data" };
}
