"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function adminNotifikasi_getByUserId({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.notifikasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: [
      {
        isRead: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
    where: {
      adminId: userLoginId,
      userRoleId: "2",
    },
  });

  return data;
}
