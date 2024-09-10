"use server";

import prisma from "@/app/lib/prisma";

export default async function getOneBeritaInvestasiById(id: string) {
  const res = await prisma.beritaInvestasi.findUnique({
    where: {
      id: id,
    },
  });
  return res;
}
