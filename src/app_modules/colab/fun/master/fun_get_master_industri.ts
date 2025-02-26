"use server";

import prisma from "@/lib/prisma";

export default async function colab_funGetMasterIndustri() {
  const data = await prisma.projectCollaborationMaster_Industri.findMany({});
  return data;
}
