"use server";

import prisma from "@/lib/prisma";

export async function funGetListPortofolio(profileId: any) {
  const data = await prisma.portofolio.findMany({
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      profileId: profileId,
      active: true,
    },
    select: {
      id: true,
      id_Portofolio: true,
      namaBisnis: true,
      profileId: true,
    },
  });

  return data;
}
