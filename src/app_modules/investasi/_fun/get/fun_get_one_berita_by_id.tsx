"use server";

import { prisma } from "@/lib";

export async function investasi_funGetOneBeritaById({
  beritaId,
}: {
  beritaId: any;
}) {
  const data = await prisma.beritaInvestasi.findFirst({
    where: {
      id: beritaId,
    },
  });


  return data;
}
