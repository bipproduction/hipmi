"use server";

import prisma from "@/lib/prisma";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { revalidatePath } from "next/cache";

export async function Event_funDeleteById(eventId: string) {
  console.log(eventId);
  const del = await prisma.event.delete({
    where: {
      id: eventId,
    },
  });
  if (!del) return { status: 400, message: "Gagal hapus data" };

  revalidatePath("/dev/event/main/status/3");
  revalidatePath("/dev/event/main/status/4");

  return {
    status: 200,
    message: "Hapus data berhasil",
  };
}
