"use server";

import prisma from "@/lib/prisma";

export async function adminInvestasi_getStatusInvestasi() {
  const data = await prisma.investasiMaster_StatusInvoice.findMany({
    where: {
      isActive: true,
    },
  });
  return data;
}
