"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function admin_funCheckStatusJob({ id }: { id: string }) {
  const data = await prisma.job.findUnique({
    where: {
      id: id,
    },
    select: {
      MasterStatus: true,
    },
  });

  if (!data)
    return { status: 400, message: "Id tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Id ditemukan",
    statusName: _.lowerCase(data.MasterStatus?.name),
  };
}
