"use server";

import { prisma } from "@/lib";

export async function funGlobal_CheckProfile({
  profileId,
}: {
  profileId: string;
}) {
  const res = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
  });

  return res;
}
