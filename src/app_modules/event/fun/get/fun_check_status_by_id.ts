"use server";

import { prisma } from "@/app/lib";

export async function event_checkStatus({ id }: { id: string }) {
  const checkStatus = await prisma.event.findFirst({
    where: {
      id: id,
    },
  });

  if (checkStatus?.eventMaster_StatusId == "2") return true;
  return false;
}
