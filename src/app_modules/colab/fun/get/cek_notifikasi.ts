"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function colab_CekNotifikasi() {
  const userLoginId = await funGetUserIdByToken();

  const cekNotif = await prisma.projectCollaboration_Notifikasi.findMany({
    where: {
      userId: userLoginId,
      isRead: false,
    },
    select: {
      isRead: true,
    },
  });

  if (cekNotif.length > 0) {
    return true;
  } else {
    return false;
  }
}
