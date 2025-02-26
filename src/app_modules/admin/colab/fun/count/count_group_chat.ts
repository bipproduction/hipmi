"use server";

import prisma from "@/lib/prisma";

export default async function adminColab_countGroupChat() {
  const count = await prisma.projectCollaboration_RoomChat.count({
    where: {
      isActive: true,
    },
  });

  return count;
}
