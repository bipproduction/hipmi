"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { count } from "console";
import _, { ceil } from "lodash";
import { revalidatePath } from "next/cache";

export default async function adminDonasi_getListReview({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  let takeData = 10;
  let skipData = page * takeData - takeData;

  const dataReview = await prisma.donasi.findMany({
    skip: skipData,
    take: takeData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      donasiMaster_StatusDonasiId: "2",
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
      Author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  const nCount = await prisma.donasi.count({
    where: {
      donasiMaster_StatusDonasiId: "2",
      active: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  //   console.log(nCount)
  const allData = {
    data: dataReview,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
