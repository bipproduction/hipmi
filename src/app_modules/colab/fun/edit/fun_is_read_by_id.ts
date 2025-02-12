"use server";

import prisma from "@/lib/prisma";
import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { revalidatePath } from "next/cache";

export default async function colab_funUpdateIsReadByNotifId(notifId: string) {
  const updtRead = await prisma.projectCollaboration_Notifikasi.update({
    where: {
      id: notifId,
    },
    data: {
      isRead: true,
    },
  });

  if (!updtRead) return { status: 400, message: "Gagal Update" };
  revalidatePath(RouterColab.notifikasi);
  return { status: 200, message: "Berhasil Udpate" };
}
