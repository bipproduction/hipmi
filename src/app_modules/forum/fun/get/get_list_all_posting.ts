"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";

export async function forum_getListAllPosting() {
  const get = await prisma.forum_Posting.findMany({
    orderBy: [
      // {
      //   forumMaster_StatusPostingId: "asc",
      // },
      {
        createdAt: "desc",
      },
    ],
    where: {
      isActive: true,
      // forumMaster_StatusPostingId: 1
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
          Profile: true,
        },
      },
      Forum_Komentar: {
        where: {
          isActive: true,
        },
      },
      ForumMaster_StatusPosting: true,
    },
  });

  const data = get.map((val) => ({
    ..._.omit(val, ["Forum_Komentar"]),
    _count: val.Forum_Komentar.length,
  }));

  return data;
}
