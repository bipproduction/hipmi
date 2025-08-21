"use server";

import prisma from "@/lib/prisma";
import { MODEL_DONASI } from "../../model/interface";

export async function Donasi_funUpdateRekening(data: MODEL_DONASI) {
  // console.log(data)
  const res = await prisma.donasi.update({
    where: {
      id: data.id,
    },
    data: {
      namaBank: data.namaBank,
      rekening: data.rekening,
    },
  });

  if (!res) return { status: 400, message: "Gagal update rekening" };
  return {
    status: 200,
    message: "Berhasil update",
  };
}
