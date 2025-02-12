"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function notifikasi_funDonasiCheckStatus({ id }: { id: string }) {
  const data = await prisma.donasi.findUnique({
    where: {
      id: id,
    },
    select: {
      DonasiMaster_Status: true,
    },
  });

  if (!data)
    return { status: 400, message: "Job tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Berhasil di cek",
    statusName: _.lowerCase(data.DonasiMaster_Status?.name),
  };
}
