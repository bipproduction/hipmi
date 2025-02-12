"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function notifikasi_funEventCheckStatus({ id }: { id: string }) {
  const data = await prisma.event.findUnique({
    where: {
      id: id,
    },
    select: {
      EventMaster_Status: true,
    },
  });

  if (!data)
    return { status: 400, message: "Job tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Berhasil di cek",
    statusName: _.lowerCase(data.EventMaster_Status?.name),
  };
}
