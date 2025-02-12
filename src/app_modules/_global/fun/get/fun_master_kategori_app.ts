"use server";

import prisma from "@/lib/prisma";

export async function funGlobal_getMasterKategoriApp() {
  const data = await prisma.masterKategoriApp.findMany({
    where: {
      isActive: true,
    },
  });
  
  return data;
}
