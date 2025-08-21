"use server";

import prisma from "@/lib/prisma";

export default async function funDeleteDokumenInvestasi(idDokumen: string) {
  const res = await prisma.dokumenInvestasi.delete({
    where: {
      id: idDokumen,
    },
  });

  if (!res) return { status: 400, message: "Gagal hapus" };

  return {
    status: 200,
    message: "Dokumen terhapus",
  };
}
