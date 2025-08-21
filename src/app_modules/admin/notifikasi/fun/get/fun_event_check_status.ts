"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function admin_funEventCheckStatus({ id }: { id: string }) {
  const data = await prisma.event.findUnique({
    where: {
      id: id,
    },
    select: {
      EventMaster_Status: true,
    },
  });

  if (!data)
    return { status: 400, message: "Id tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Id ditemukan",
    statusName: _.lowerCase(data.EventMaster_Status?.name),
  };
}
