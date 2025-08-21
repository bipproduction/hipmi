"use server";

import prisma from "@/lib/prisma";

/**
 * 
 * @param status | string > 1 - 4
 * @returns jumlah dari donasi per status
 */
export default async function AdminDonasi_funCountByStatus(status: string) {
    if (status === "1") {
        const count = await prisma.donasi.count({
          where: {
            donasiMaster_StatusDonasiId: "1",
          },
        });
        return count;
      }
  if (status === "2") {
    const count = await prisma.donasi.count({
      where: {
        donasiMaster_StatusDonasiId: "2",
      },
    });
    return count;
  }
  if (status === "3") {
    const count = await prisma.donasi.count({
      where: {
        donasiMaster_StatusDonasiId: "3",
      },
    });
    return count;
  }
  if (status === "4") {
    const count = await prisma.donasi.count({
      where: {
        donasiMaster_StatusDonasiId: "4",
      },
    });
    return count;
  }
  if (status === undefined || status === null) {
    
    return {
        status: 400,
        message: "Parameter tidak sesuai"
    }
  }
}
