"use server";

import prisma from "@/lib/prisma";
import _, { ceil } from "lodash";

export default async function adminDeveloper_funGetListAllAdmin({
  search,
  page,
}: {
  search?: any;
  page: any;
}) {
  const dataSkip = _.toNumber(page) * 9 - 9;
  const data = await prisma.user.findMany({
    skip: dataSkip,
    take: 9,
    orderBy: {
      updatedAt: "asc",
    },
    where: {
      masterUserRoleId: "2",
      username: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const nCount = await prisma.user.count({
    where: {
      masterUserRoleId: "2",
      username: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / 9),
  };

  return allData;
}
