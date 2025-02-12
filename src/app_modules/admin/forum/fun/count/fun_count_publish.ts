"use server";

import prisma from "@/lib/prisma";

export async function adminForum_countPublish() {
  const count = await prisma.forum_Posting.count({
    where: {
      isActive: true,
      
    },

  });

  return count;
}
