"use server";

import prisma from "@/lib/prisma";

export default async function getPencarianInvestor() {
  const data = await prisma.masterPencarianInvestor.findMany({
    select: {
      id: true,
      name: true,
      active: true,
    },
  });

  return data;
}
