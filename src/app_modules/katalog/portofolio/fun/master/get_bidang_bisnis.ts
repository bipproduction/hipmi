"use server";

import prisma from "@/lib/prisma";

export async function Portofolio_getMasterBidangBisnis() {
  const data = await prisma.masterBidangBisnis.findMany({
    where: {
      active: true,
    },
  });
  
  return data;
}
