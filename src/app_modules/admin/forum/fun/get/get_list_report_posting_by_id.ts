"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminForum_getListReportPostingById({
  postingId,
  page,
}: {
  postingId: string;
  page: number;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.forum_ReportPosting.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      forum_PostingId: postingId,
    },
    select: {
      id: true,
      deskripsi: true,
      createdAt: true,
      User: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              name: true,
            },
          },
        },
      },
      ForumMaster_KategoriReport: {
        select: {
          id: true,
          title: true,
          deskripsi: true,
        },
      },
    },
  });

  const nCount = await prisma.forum_ReportPosting.count({
    where: {
      forum_PostingId: postingId,
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
