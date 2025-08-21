"use server";

import { prisma } from "@/lib";

export async function investasi_funGetAllDocumentById({
  investasiId,
  page,
}: {
  investasiId: string;
  page: number
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.dokumenInvestasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      investasiId: investasiId,
      active: true,
    },
  });

  return data;
}
