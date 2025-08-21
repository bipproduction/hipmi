"use server";

import prisma from "@/lib/prisma";

export async function job_getTwoForHomeView() {
  const get = await prisma.job.findMany({
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isActive: true,
      masterStatusId: "1"
    },
    select: {
      id: true,
      Author: {
        select: {
          id: true,
          username: true,
        },
      },
      title: true,
      deskripsi: true
    },
  });

  return get;
}
