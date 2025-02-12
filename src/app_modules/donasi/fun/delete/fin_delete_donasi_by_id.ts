"use server";

import prisma from "@/lib/prisma";

export async function Donasi_funDeleteDonasiById(donasiId: string) {
  const delCerita = await prisma.donasi_Cerita.delete({
    where: {
      donasiId: donasiId,
    },
  });

  if (!delCerita) return { status: 400, message: "Gagal hapus data cerita" };

  const delDonasi = await prisma.donasi.delete({
    where: {
      id: donasiId,
    },
  });

  if (!delDonasi) return { status: 400, message: "Gagal hapus data donasi" };

  return {
    status: 200,
    message: "Berhasil hapus",
  };
}
