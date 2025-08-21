"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function colab_getListAllProyekSayaByAuthorId({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.projectCollaboration.findMany({
    take: takeData,
    skip: skipData,
    orderBy: { createdAt: "desc" },
    where: { userId: userLoginId, isActive: true },
    select: {
      id: true,
      isActive: true,
      title: true,
      lokasi: true,
      purpose: true,
      benefit: true,
      // jumlah_partisipan: true,
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
  });

  return data;
}
