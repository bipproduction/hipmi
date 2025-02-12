"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { revalidatePath } from "next/cache";

// NEW FUNCTION
export default async function adminDonasi_funUpdateStatusDanTotal({
  invoiceId,
  donasiId,
  statusInvoiceId,
  nominal,
  jumlahTerkumpul,
  target,
}: {
  invoiceId: string;
  donasiId: string;
  statusInvoiceId: string;
  nominal: number;
  jumlahTerkumpul: number;
  target: number;
}) {
  let totalNominal = nominal + jumlahTerkumpul;
  const progres = (totalNominal / target) * 100;

  const updateInvoice = await prisma.donasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      donasiMaster_StatusInvoiceId: statusInvoiceId,
    },
    select: {
      id: true,
      authorId: true,
      Donasi: {
        select: {
          id: true,
          title: true,
          authorId: true,
          
        },
      },
      DonasiMaster_StatusInvoice: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!updateInvoice) return { status: 400, message: "Update invoice gagal" };

  const updateDonasi = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      terkumpul: "" + totalNominal,
      progres: "" + progres,
    },
  });

  if (!updateDonasi) return { status: 400, message: "Update donasi gagal" };
  revalidatePath(RouterAdminDonasi_OLD.detail_publish + donasiId);
  return { data: updateInvoice, status: 200, message: "Update Berhasil" };
}
