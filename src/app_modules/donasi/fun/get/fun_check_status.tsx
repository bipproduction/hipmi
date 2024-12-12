"use server";

import { prisma } from "@/app/lib";

export async function donasi_checkStatus({ id }: { id: string }) {
  const checkStatus = await prisma.donasi.findFirst({
    where: {
      id: id,
    },
  });


  if (checkStatus?.donasiMaster_StatusDonasiId == "2") return true;
  return false;

}
