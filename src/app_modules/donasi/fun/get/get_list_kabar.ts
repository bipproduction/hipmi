"use server";

import prisma from "@/lib/prisma";

export async function donasi_funGetListKabarById({
  page,
  donasiId,
}: {
  page: number;
  donasiId: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;
  const data = await prisma.donasi_Kabar.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiId: donasiId,
      active: true,
    },
    select: {
      id: true,
      title: true,
      deskripsi: true,
      createdAt: true,
    },
  });
  return data;
}
