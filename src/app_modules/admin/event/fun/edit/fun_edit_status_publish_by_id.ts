"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditStatusPublishById(
  eventId: string,
  statusId: string
) {
  const updt = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      eventMaster_StatusId: statusId,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      EventMaster_Status: {
        select: {
          name: true,
        },
      },
    }
  });

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath("/dev/admin/event/main");
  return {
    data: updt,
    status: 200,
    message: "Berhasil Update Status",
  };
}
