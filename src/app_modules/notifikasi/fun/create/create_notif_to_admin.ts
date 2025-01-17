"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_NOTIFIKASI } from "../../model/interface";

export default async function notifikasiToAdmin_funCreate({
  data,
}: {
  data: MODEL_NOTIFIKASI;
}) {
  const getAdmin = await prisma.user.findMany({
    where: {
      active: true,
      masterUserRoleId: "2",
    },
  });

  for (let a of getAdmin) {
    const create = await prisma.notifikasi.create({
      data: {
        adminId: a.id,
        userId: data.userId,
        appId: data.appId,
        status: data.status,
        title: data.title,
        pesan: data.pesan,
        kategoriApp: data.kategoriApp,
        userRoleId: "2",
      },
    });

    if (!create) return { status: 400, message: "Gagal mengirim notifikasi" };
  }
  return { status: 201, message: "Berhasil mengirim notifikasi" };
}
