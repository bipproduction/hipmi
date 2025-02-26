"use server";

import prisma from "@/lib/prisma";

export async function forum_getMasterKategoriReport() {
  const data = await prisma.forumMaster_KategoriReport.findMany({});
  return data;
}
