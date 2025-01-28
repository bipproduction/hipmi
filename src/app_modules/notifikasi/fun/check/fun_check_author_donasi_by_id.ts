"use server";

import { prisma } from "@/app/lib";

export async function notifikasi_checkAuthorDonasiById({
  userId,
  donasiId,
}: {
  userId: string;
  donasiId: string;
}) {
  const check = await prisma.donasi.findFirst({
    where: {
      authorId: userId,
      id: donasiId,
    },
  });

  if (check) {
    return true;
  } else {
    return false;
  }
}
