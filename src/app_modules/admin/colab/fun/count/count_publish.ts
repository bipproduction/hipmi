"use server";

import prisma from "@/lib/prisma";

export default async function adminColab_countIsPublish() {
  const count = await prisma.projectCollaboration.count({
    where: {
      isActive: true,
    },
  });

  return count;
}
