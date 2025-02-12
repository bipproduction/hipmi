"use server";

import prisma from "@/lib/prisma";

export async function adminForum_countLaporanPosting() {
  const count = await prisma.forum_ReportPosting.count({
    where: {
      isActive: true,
      Forum_Posting: {
        isActive: true,
      },
    },
  });

  return count;
}
