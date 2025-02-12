"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function adminNotifikasi_countNotifikasi() {
  const userLoginId = await funGetUserIdByToken();

  const data = await prisma.notifikasi.findMany({
    where: {
      adminId: userLoginId,
      isRead: false,
      userRoleId: "2",
    },
  });

  return data.length;
}
