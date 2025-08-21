"use server";

import { prisma } from "@/lib";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function investasi_funDeleteDokumenById({
  dokumenId,
}: {
  dokumenId: string;
}) {
  const del = await prisma.dokumenInvestasi.delete({
    where: {
      id: dokumenId,
    },
  });

  if (!del) return { status: 400, message: "Gagal hapus data" };
  revalidatePath(NEW_RouterInvestasi.rekap_dokumen({ id: del.investasiId as any }));
  return { status: 200, message: "Berhasil hapus data" };
}
