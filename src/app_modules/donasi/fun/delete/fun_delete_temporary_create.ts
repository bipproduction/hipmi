"use server";

import prisma from "@/lib/prisma";

export async function Donasi_funDeleteTemporaryCreate(id: string) {
  const del = await prisma.donasi_TemporaryCreate.delete({
    where: {
      id: id,
    },
  });

  if(!del) return {status: 400, message:"Gagal hapus temporary"}
  return {
    status: 200,
    message: "Berhasil hapus temporary"
  }
}
