"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export default async function adminForum_funGetAllReportPosting({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {

  const takeData = 10
  const skipData = page * takeData - takeData

  const data = await prisma.forum_ReportPosting.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      Forum_Posting: {
        isActive: true,
        diskusi: {
          contains: search,
          mode: "insensitive"
        }
      },
      
    },
    select: {
      id: true,
      isActive: true,
      createdAt: true,
      deskripsi: true,
      forumMaster_KategoriReportId: true,
      ForumMaster_KategoriReport: {
        select: {
          id: true,
          title: true,
          deskripsi: true,
        },
      },

      forum_PostingId: true,
      Forum_Posting: {
        select: {
          id: true,
          diskusi: true,
          ForumMaster_StatusPosting: {
            select: {
              id: true,
              status: true,
            }
          },
          Author: {
            select: {
              id: true,
               username: true
            }
          }
        },
      },
      userId: true,
      User: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });


  const nCount = await prisma.forum_ReportPosting.count({
    where: {
      Forum_Posting: {
        isActive: true,
        diskusi: {
          contains: search,
          mode: "insensitive",
        },
      },
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
