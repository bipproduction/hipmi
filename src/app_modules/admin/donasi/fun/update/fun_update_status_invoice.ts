"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { revalidatePath } from "next/cache";

export async function AdminDonasi_funUpdateStatusInvoice(
  invoiceId: string,
  statusId: string
) {
  const update = await prisma.donasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      donasiMaster_StatusInvoiceId: statusId,
    },
  });
  if (!update) return { status: 400, message: "Update gagal" };
  revalidatePath("/dev/admin/donasi/detail/publish")
  return {
    status: 200,
    message: "Update berhasil",
  };
}
