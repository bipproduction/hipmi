"use server";

import prisma from "@/lib/prisma";

export default async function funDeleteBeritaInvestasi(id: string) {
  const res = await prisma.beritaInvestasi.delete({
    where: {
      id: id,
    },
  });

  if (!res) return { status: 400, message: "Gagal hapus" };

  return {
    status: 200,
    message: "Berita terhapus",
  };
}
