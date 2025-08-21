"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminInvestasi_funGetAllReview({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      active: true,
      masterStatusInvestasiId: "2",
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      hargaLembar: true,
      targetDana: true,
      totalLembar: true,
      roi: true,
      active: true,
      author: true,
    },
  });

  const nCount = await prisma.investasi.count({
    where: {
      active: true,
      masterStatusInvestasiId: "2",
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
