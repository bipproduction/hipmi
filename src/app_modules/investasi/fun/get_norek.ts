"use server";

import prisma from "@/lib/prisma";

export default async function getNorekInvestasi(id: string) {
  const res = await prisma.masterBank.findUnique({
    where: { id: id },
    select: {
      namaBank: true,
      norek: true,
    },
  });

  if(!res) return {status: 400, message: "Nomor rekeneing tidak tersedia"}

  return {
    res,
    status: 200,
    message: "Berhasil"
  }
}
