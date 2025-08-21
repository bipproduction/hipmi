"use server";

import prisma from "@/lib/prisma";

export async function adminMap_funGetAllMaps() {
  const data = await prisma.businessMaps.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
      
    },
    include: {
      Portofolio: true,
    },
  });

  return data;
}
