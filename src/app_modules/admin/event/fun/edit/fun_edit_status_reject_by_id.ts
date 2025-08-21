"use server";

import prisma from "@/lib/prisma";
import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditCatatanById(
  data: MODEL_EVENT,
  statudId: string
) {
  const updt = await prisma.event.update({
    where: {
      id: data.id,
    },
    data: {
      eventMaster_StatusId: statudId,
      catatan: data.catatan,
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

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath("/dev/admin/event/main");
  return {
    data: updt,
    status: 200,
    message: "Berhasil Update Status",
  };
}
