"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function admin_funDonasiCheckStatus({ id }: { id: string }) {
  const data = await prisma.donasi.findUnique({
    where: {
      id: id,
    },
    select: {
      DonasiMaster_Status: true,
    },
  });

  if (!data)
    return { status: 400, message: "Id tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Id ditemukan",
    statusName: _.lowerCase(data.DonasiMaster_Status?.name),
  };
}
