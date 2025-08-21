"use server";

import prisma from "@/lib/prisma";

export default async function colab_funGetMasterStatus() {
  const data = await prisma.projectCollaborationMaster_Status.findMany({});
  return data;
}
