"use server";

import prisma from "@/lib/prisma";

export async function donasi_getOneStatusInvoiceById({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const res = await prisma.donasi_Invoice.findFirst({
    where: {
      id: invoiceId,
    },
    select: {
      id: true,
      authorId: true,
      donasiMaster_StatusInvoiceId: true,
      DonasiMaster_StatusInvoice: true,
    },
  });

  return res;
}
