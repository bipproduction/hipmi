"use server";

import prisma from "@/lib/prisma";

export async function portofolio_getOneById(portoId: string) {
  // console.log(id)
  const data = await prisma.portofolio.findUnique({
    where: {
      id: portoId,
    },
    include: {
      MasterBidangBisnis: {
        select: {
          id: true,
          name: true,
          active: true,
        },
      },
      Portofolio_MediaSosial: true,
      Profile: {
        select: {
          userId: true,
          User: {
            select: {
              id: true,
            },
          },
        },
      },
      BusinessMaps: {
        include: {
          Author: true,
        },
      },
    },
  });

  return data;
}
