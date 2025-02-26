"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Donasi_funUpdateNotifById(notifId: string) {
  const updateNotif = await prisma.donasi_Notif.update({
    where: {
      id: notifId,
    },
    data: {
      isRead: true,
    },
  });
  if (!updateNotif) return { status: 400, message: "Update notif gagal" };
  revalidatePath("/dev/donasi/notif_page");
  return {
    status: 200,
    message: "Berhasil update notif",
  };
}
