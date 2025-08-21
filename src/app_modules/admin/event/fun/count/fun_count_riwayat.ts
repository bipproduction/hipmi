"use server";

import prisma from "@/lib/prisma";

export async function AdminEvent_funCountRiwayat() {
  const data = await prisma.event.count({
    where: {
      eventMaster_StatusId: "1",
      isArsip: true,
    },
  });

  return data;
}
