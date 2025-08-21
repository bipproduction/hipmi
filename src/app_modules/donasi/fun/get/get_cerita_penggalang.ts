"use server";

import prisma from "@/lib/prisma";

export default async function Donasi_getCeritaByDonasiId(donasiId: string) {
  const data = await prisma.donasi_Cerita.findFirst({
    where: {
      donasiId: donasiId,
    },
    select: {
      id: true,
      pembukaan: true,
      cerita: true,
      imageCeritaDonasi: true,
      createdAt: true,
      imageId: true,
    },
  });
  return data;
}
