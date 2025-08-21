"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 *
 * @param statusid | Review: 2, Draft: 3, Reject: 4
 * @param eventId
 * @type string
 * @returns Update status id dari setiap event
 */
export async function Event_funEditStatusById(
  statusid: string,
  eventId: string
) {
  const updt = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      eventMaster_StatusId: statusid,
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
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update Status" };
  revalidatePath("/dev/event/main/status_page");
  return {
    data: updt,
    status: 200,
    message: "Berhasil Update Status",
  };
}
