"use server";

import prisma from "@/lib/prisma";

export async function AdminDonasi_funCountDonatur(donasiId: string) {
  const donatur = await prisma.donasi_Invoice.count({
   where: {
    donasiId: donasiId,
    donasiMaster_StatusInvoiceId: "1"
   }
  });

  return donatur;
}
