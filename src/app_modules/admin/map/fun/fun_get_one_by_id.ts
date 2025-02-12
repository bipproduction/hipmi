"use server";

import prisma from "@/lib/prisma";

export async function adminMap_funGetOneById({ mapId }: { mapId: string }) {
  const data = await prisma.businessMaps.findFirst({
    where: {
      id: mapId,
    },
    include: {
      Author: true,
      Portofolio: {
        include: {
          MasterBidangBisnis: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return data;
}
