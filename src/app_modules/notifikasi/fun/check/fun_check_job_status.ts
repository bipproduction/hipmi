"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function notifikasi_funJobCheckStatus({ id }: { id: string }) {
  const data = await prisma.job.findUnique({
    where: {
      id: id,
    },
    select: {
      MasterStatus: true,
    },
  });

  if (!data)
    return { status: 400, message: "Job tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Berhasil di cek",
    statusName: _.lowerCase(data.MasterStatus?.name),
  };
}
