"use server";

import prisma from "@/lib/prisma";

export default async function adminDonasi_getMasterStatus() {
  const data = await prisma.donasiMaster_StatusInvoice.findMany({});

  return data;
}
