"use server";

import prisma from "@/lib/prisma";

export default async function funTotalInvestorByIdInvestasi(id: any) {
  // console.log(id)
  const data = await prisma.transaksiInvestasi.count({
    where: {
      investasiId: id,
      status_code: "200"
    },
  });

  return data;
}
// belum ke hitungg
