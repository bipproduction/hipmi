"use server";

import { prisma } from "@/lib";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function investasi_funGetBeritaById({
  investasiId,
}: {
  investasiId: string;
}) {
  const data = prisma.beritaInvestasi.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      investasiId: investasiId,
      active: true,
    },
  });

  revalidatePath(NEW_RouterInvestasi.rekap_berita({ id: investasiId }));
  return data;
}
