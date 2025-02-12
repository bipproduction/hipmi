"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";
import mqtt_client from "@/util/mqtt_client";

export async function notifikasiToUser_CreateKabarDonasi({
  donasiId,
  kabarId,
}: {
  donasiId: string;
  kabarId: string;
}) {
  const getDataDonasi = await prisma.donasi.findFirst({
    where: {
      id: donasiId,
    },
  });

  const getDonatur = await prisma.donasi_Invoice.findMany({
    where: {
      donasiId: donasiId,
    },
    select: {
      authorId: true,
    },
  });

  const data = new Set(getDonatur.map((e) => e.authorId));
  const dataFix = Array.from(data);

  for (let authorId of dataFix) {
    const createNotifikasi = await prisma.notifikasi.create({
      data: {
        userRoleId: "1",
        userId: authorId,
        appId: kabarId,
        pesan: getDataDonasi?.title as any,
        kategoriApp: "DONASI",
        status: "Kabar Donasi",
        title: "Kabar terupdate donasi anda !",
      },
    });

    if (!createNotifikasi)
      return { status: 400, message: "Gagal membuat notifikasi" };

    mqtt_client.publish(
      "USER",
      JSON.stringify({
        userId: authorId,
        count: 1,
      })
    );
  }
  return { status: 201, message: "Berhasil membuat notifikasi" };
}
