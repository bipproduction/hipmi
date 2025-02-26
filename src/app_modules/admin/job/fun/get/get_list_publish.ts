"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export default async function adminJob_getListPublish({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  let takeData = 5;
  let skipData = page * takeData - takeData;

  const getData = await prisma.job.findMany({
    skip: skipData,
    take: takeData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "1",
      isActive: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      Author: true,
    },
  });

  const nCount = await prisma.job.count({
    where: {
      masterStatusId: "1",
      isActive: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: getData,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
