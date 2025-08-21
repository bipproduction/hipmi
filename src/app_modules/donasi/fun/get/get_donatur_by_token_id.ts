"use server";

import prisma from "@/lib/prisma";

export async function Donasi_findDonaturByTokenId(
  donasiId: string,
  userId: string
) {
  const data = await prisma.donasi_Invoice.count({
    where: {
      donasiId: donasiId,
      authorId: userId,
    },
  });

  if (data > 0) {
    return true;
  } else {
    return false;
  }

}
