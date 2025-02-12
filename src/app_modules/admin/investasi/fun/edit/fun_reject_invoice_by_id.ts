"use server";

import prisma from "@/lib/prisma";
import { RouterAdminInvestasi } from "@/lib/router_admin/router_admin_investasi";
import { revalidatePath } from "next/cache";

export async function adminInvestasi_funRejectInvoiceById({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const updt = await prisma.investasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      statusInvoiceId: "4",
    },
    select: {
      StatusInvoice: true,
      authorId: true,
    },
  });

  if (!updt)
    return { status: 400, message: "Gagal Melakukan Reject", statusName: "" , userId: ""};
  revalidatePath(RouterAdminInvestasi.detail_publish);
  return {
    status: 200,
    message: "Reject Berhasil",
    statusName: updt.StatusInvoice?.name,
    userId: updt.authorId,
  };
}
