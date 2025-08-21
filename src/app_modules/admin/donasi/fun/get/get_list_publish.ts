"use server";

import prisma from "@/lib/prisma";
import { count } from "console";
import _, { ceil } from "lodash";

export default async function adminDonasi_getListPublish({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  let takeData = 10;
  let skipData = page * takeData - takeData;

  const dataPublish = await prisma.donasi.findMany({
    skip: skipData,
    take: takeData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiMaster_StatusDonasiId: "1",
      active: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      target: true,
      authorId: true,
      terkumpul: true,
      imageDonasi: true,
      DonasiMaster_Ketegori: true,
      DonasiMaster_Durasi: true,
      imageId: true,
    },
  });

  const nCount = await prisma.donasi.count({
    where: {
      donasiMaster_StatusDonasiId: "1",
      active: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: dataPublish,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
