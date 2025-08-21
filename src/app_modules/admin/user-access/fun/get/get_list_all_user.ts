"use server";

import prisma from "@/lib/prisma";
import _, { ceil } from "lodash";

export default async function adminUserAccess_getListUser({
  search,
  page,
}: {
  search?: string;
  page: number;
}) {
  const dataSkip = _.toNumber(page) * 9 - 9;
  const dataTake = 9;

  const getData = await prisma.user.findMany({
    skip: dataSkip,
    take: 9,
    orderBy: {
      updatedAt: "asc",
    },
    where: {
      masterUserRoleId: "1",
      username: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const nCount = await prisma.user.count({
    where: {
      masterUserRoleId: "1",
      username: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: getData,
    nPage: ceil(nCount / dataTake),
  };

  return allData;
}
