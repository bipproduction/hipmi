"use server";

import prisma from "@/lib/prisma";

export async function AdminDonasi_getListPencairanDana(donasiId: string) {
  const data = await prisma.donasi_PencairanDana.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiId: donasiId,
    },
  });

  return data;
}
