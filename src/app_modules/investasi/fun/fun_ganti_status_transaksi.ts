"use server";

import prisma from "@/lib/prisma";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export default async function funGantiStatusTransaksi_Investasi(
  transaksiId: string,
  status: string
) {
  // console.log(transaksiId, "hehe", status)
  const data = await prisma.transaksiInvestasi.update({
    where: {
      id: transaksiId,
    },
    data: {
      masterStatusTransaksiInvestasiId: status,
    },
    select: {
      id: true,
      namaBank: true,
      Investasi: true,
      MasterStatusTransaksiInvestasi: true
    }
  });



  if (!data) return { status: 400, message: "Status Gagal Diubah" };

  revalidatePath(RouterInvestasi_OLD.main_transaksi)
  return {
    data: data,
    status: 200,
    message: "Status Diubah",
  };
}
