"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminForum_getListKomentarById({
  postingId,
  page,
  search,
}: {
  postingId: string;
  page: number;
  search?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.forum_Komentar.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      forum_PostingId: postingId,
      isActive: true,
      komentar: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      isActive: true,
      komentar: true,
      createdAt: true,
      authorId: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              name: true,
              imageId: true,
            },
          },
        },
      },
      Forum_ReportKomentar: true,
    },
  });

  const nCount = await prisma.forum_Komentar.count({
    where: {
      forum_PostingId: postingId,
      isActive: true,
      komentar: {
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
