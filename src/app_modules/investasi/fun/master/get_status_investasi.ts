"use server";

import prisma from "@/lib/prisma";

export default async function getStatusInvestasi() {
  const data = await prisma.masterStatusInvestasi.findMany({
    select: {
      id: true,
      name: true,
      color: true,
    },
  });
  return data;
}
