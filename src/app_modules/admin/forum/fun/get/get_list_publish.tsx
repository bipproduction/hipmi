"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminForum_getListPosting({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.forum_Posting.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
      diskusi: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      diskusi: true,
      isActive: true,
      createdAt: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: true,
        },
      },
      Forum_ReportPosting: true,
      Forum_Komentar: {
        where: {
          isActive: true,
        },
      },
      ForumMaster_StatusPosting: true,
    },
  });

  const nCount = await prisma.forum_Posting.count({
    where: {
      isActive: true,
      diskusi: {
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
