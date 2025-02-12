"use server";

import prisma from "@/lib/prisma";

export async function donasi_funGetListPencairanDanaById({
  page,
  donasiId,
}: {
  page: number;
  donasiId: string;
}) {
  const takeData = 5;
  const skipData = page * takeData - takeData;
  const data = await prisma.donasi_PencairanDana.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiId: donasiId,
    },
  });

  return data;
}
