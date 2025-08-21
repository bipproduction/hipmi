"use server";

import { prisma } from "@/lib";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function investasi_funUpdateProspektus({
  investasiId,
  fileId,
}: {
  investasiId: string;
  fileId: string;
}) {
  const updte = await prisma.investasi.update({
    where: {
      id: investasiId,
    },
    data: {
      prospektusFileId: fileId,
    },
  });

  if (!updte) return { status: 400, message: "Gagal update prospektus" };
  revalidatePath(NEW_RouterInvestasi.detail_draft);
  return {
    status: 200,
    message: "Berhasil update prospektus",
  };
}
