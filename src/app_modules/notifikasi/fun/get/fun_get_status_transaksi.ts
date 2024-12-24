"use server";

import prisma from "@/app/lib/prisma";

export default async function notifikasi_funGetStatusTransaksiById({
  notifId,
}: {
  notifId: string;
}) {
  const data = await prisma.notifikasi.findFirst({
    where: {
      id: notifId,
    },
    select: {
      status: true,
    },
  });


  if (!data) return { status: 400 };
  return { status: 200, data: data };
}
