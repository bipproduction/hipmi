"use server";

import { prisma } from "@/lib";

export async function voting_getMasterStatus() {
  const data = await prisma.voting_Status.findMany({});

  return data;
}
