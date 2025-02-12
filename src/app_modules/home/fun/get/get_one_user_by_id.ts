"use server";

import prisma from "@/lib/prisma";

export async function user_getOneByUserId(userId?: string) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      Profile: true,
    },
  });

  return data;
}
