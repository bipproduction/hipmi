"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function adminNotifikasi_funCreateToAllUser({
  data,
  authorId,
}: {
  data: any;
  authorId: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const dataUser = await prisma.user.findMany({
    where: {
      NOT: {
        id: authorId,
      },
      active: true,
      masterUserRoleId: "1",
    },
  });

  for (let i of dataUser) {
    const create = await prisma.notifikasi.create({
      data: {
        adminId: userLoginId,
        userId: i.id,
        appId: data.id,
        status: data.DonasiMaster_Status.name,
        title: "Donasi baru terpublish",
        pesan: data.title,
        kategoriApp: "DONASI",
        userRoleId: "1",
      },
    });
    if (!create) {
      await prisma.$disconnect();
      return { status: 400, message: "Gagal mengirim notifikasi" };
    }
  }

  await prisma.$disconnect();
  return {
    status: 201,
    message: "Berhasil mengirim notifikasi",
    data: dataUser,
  };
}
