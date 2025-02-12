"use server";

import prisma from "@/lib/prisma";

export default async function forum_getOneKategoriById({
  kategoriId,
}: {
  kategoriId: number;
}) {
  const cekData = await prisma.forumMaster_KategoriReport.findFirst({
    where: {
      id: kategoriId,
    },
  });

  return cekData;
}
