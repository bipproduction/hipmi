"use server";

import prisma from "@/lib/prisma";

export async function map_funGetOneById({ mapId }: { mapId: string }) {
  const data = await prisma.businessMaps.findFirst({
    where: {
      id: mapId,
    },
    include: {
      Author: {
        select: {
          id: true,
          username: true,
          Profile: true,
        },
      },
      Portofolio: {
        select: {
          id: true,
          alamatKantor: true,
          tlpn: true,
          deskripsi: true,
          namaBisnis: true,
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
