"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Donasi_funUpdateStatusInvoice({
  invoiceId,
  statusId,
  fileId,
}: {
  invoiceId: string;
  statusId: string;
  fileId: string;
}) {
  const data = await prisma.donasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      donasiMaster_StatusInvoiceId: statusId,
      imageId: fileId,
    },
    select: {
      id: true,
      DonasiMaster_StatusInvoice: {
        select: {
          name: true,
        },
      },
      Donasi: {
        select: {
          id: true,
          title: true,
          authorId: true,
        },
      },
    },
  });

  if (!data)
    return { status: 400, message: "Gagal memperbarui status transaksi" };
  // revalidatePath("dev/admin/donasi/detail/publish");
  return {
    data: data,
    status: 200,
    message: "Berhasil memperbarui status transaksi",
  };
}
