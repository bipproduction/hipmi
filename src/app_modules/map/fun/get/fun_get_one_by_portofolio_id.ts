"use server";

import prisma from "@/lib/prisma";

export async function map_funGetOneBusinessMapByPortofolioId({
  portofolioId,
}: {
  portofolioId: string;
}) {
  const res = await prisma.businessMaps.findFirst({
    where: {
      portofolioId: portofolioId,
    },
    include: {
      Portofolio: {
        select: {
          id: true,
          logoId: true
        }
      }
    }
  });

  return res;
}
