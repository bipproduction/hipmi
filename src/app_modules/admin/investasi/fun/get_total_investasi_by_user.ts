"use server";

import prisma from "@/lib/prisma";

export default async function Admin_getTotalInvestasiByUser() {
  const data = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          Investasi: true,
        },
      },
    },
  });

  return data;
}
