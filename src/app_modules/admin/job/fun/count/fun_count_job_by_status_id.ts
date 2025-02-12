"use server";

import prisma from "@/lib/prisma";

export async function AdminJob_funCountStatusByStatusId(statusId: string) {
  if (statusId === "0") {
    const data = await prisma.job.count({
      where: {
        masterStatusId: "1",
        isArsip: true,
      },
    });

    return data;
  }
  if (statusId === "1") {
    const data = await prisma.job.count({
      where: {
        masterStatusId: "1",
        isArsip: false,
      },
    });

    return data;
  }
  if (statusId === "2") {
    const data = await prisma.job.count({
      where: {
        masterStatusId: "2",
      },
    });

    return data;
  }
  if (statusId === "4") {
    const data = await prisma.job.count({
      where: {
        masterStatusId: "4",
      },
    });

    return data;
  }
}
