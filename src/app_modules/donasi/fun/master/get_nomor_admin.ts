"use server";

import prisma from "@/lib/prisma";

export default async function donasi_getMasterNomorAdmin() {
  const get = await prisma.nomorAdmin.findFirst({
    where: {
      isActive: true,
    },
  });
  return get;
}
