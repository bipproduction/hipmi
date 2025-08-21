"use server";

import prisma from "@/lib/prisma";

export default async function adminNotifikasi_funUpdateIsReadById({
  notifId,
}: {
  notifId: string;
}) {
  const updt = await prisma.notifikasi.update({
    where: {
      id: notifId,
    },
    data: {
      isRead: true,
    },
  });

  if (!updt) return { status: 400 };
  return { status: 200 };
}
