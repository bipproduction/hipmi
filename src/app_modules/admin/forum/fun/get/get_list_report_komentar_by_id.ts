"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminForum_getListReportKomentarbyId({
  komentarId,
  page,
  search,
}: {
  komentarId: string;
  page: number;
  search?: string;
}) {
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.forum_ReportKomentar.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      forum_KomentarId: komentarId,
    },
    select: {
      id: true,
      isActive: true,
      createdAt: true,
      deskripsi: true,
      ForumMaster_KategoriReport: true,
      User: {
        select: {
          username: true,
          Profile: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const nCount = await prisma.forum_ReportKomentar.count({
    where: {
      forum_KomentarId: komentarId,
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
