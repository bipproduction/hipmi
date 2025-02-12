"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";

export default async function adminNotifikasi_funCreateToUser({
  data,
}: {
  data: MODEL_NOTIFIKASI;
}) {
  const userLoginId = await funGetUserIdByToken();

  const create = await prisma.notifikasi.create({
    data: {
      adminId: userLoginId,
      userId: data.userId,
      appId: data.appId,
      status: data.status,
      title: data.title,
      pesan: data.pesan,
      kategoriApp: data.kategoriApp,
      userRoleId: "1",
    },
  });

  if (!create) {
    await prisma.$disconnect();
    return { status: 400, message: "Gagal mengirim notifikasi" };
  }

  await prisma.$disconnect();
  return { status: 201, message: "Berhasil mengirim notifikasi" };
}
