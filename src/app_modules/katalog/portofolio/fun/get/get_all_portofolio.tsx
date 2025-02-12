"use server";

import prisma from "@/lib/prisma";

export async function portofolio_funGetAllDaftarByid({
  profileId,
  page,
}: {
  profileId: string;
  page: number;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.portofolio.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      profileId: profileId,
      active: true,
    },
  });

  return data
}
