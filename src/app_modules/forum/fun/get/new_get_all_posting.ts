"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function forum_new_getAllPosting({
  page,
  search,
}: {
  page: any;
  search?: string;
}) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const getData = await prisma.forum_Posting.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
      diskusi: {
        mode: "insensitive",
        contains: search,
      },
    },
    select: {
      id: true,
      diskusi: true,
      createdAt: true,
      isActive: true,
      authorId: true,
      Author: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              id: true,
              name: true,
              imageId: true,
            },
          },
        },
      },
      Forum_Komentar: {
        where: {
          isActive: true,
        },
      },
      ForumMaster_StatusPosting: {
        select: {
          id: true,
          status: true,
        },
      },
      forumMaster_StatusPostingId: true,
    },
  });

  return getData;
}
