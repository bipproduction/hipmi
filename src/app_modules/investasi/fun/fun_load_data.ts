"use server";

import prisma from "@/lib/prisma";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export default async function funLoadDataInvestasi(id: string) {
    const data = await prisma.investasi.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          authorId: true,
          hargaLembar: true,
          targetDana: true,
          totalLembar: true,
          roi: true,
          active: true,
          imagesId: true,
          MasterStatusInvestasi: true,
          BeritaInvestasi: true,
          DokumenInvestasi: true,
          ProspektusInvestasi: true,
          MasterPembagianDeviden: true,
          MasterPencarianInvestor: true,
          MasterPeriodeDeviden: true,
        },
      });
    
      return data;
}
