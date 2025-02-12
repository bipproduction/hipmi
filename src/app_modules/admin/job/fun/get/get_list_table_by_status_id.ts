"use server";

import prisma from "@/lib/prisma";

export async function AdminJob_getListTableByStatusId(statusId: string) {
  if (statusId === "0") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "1",
        isActive: true,
        isArsip: true,
      },
      include: {
        Author: true,
      },
    });

    return getData;
  }
  if (statusId === "1") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "1",
        isActive: true,
        isArsip: false,
      },
      include: {
        Author: true,
      },
    });

    return getData;
  }
  if (statusId === "2") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "2",
        isActive: true,
      },
      include: {
        Author: true,
      },
    });

    return getData;
  }

  if (statusId === "4") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "4",
        isActive: true,
      },
      include: {
        Author: true,
      },
    });

    return getData;
  }
}
