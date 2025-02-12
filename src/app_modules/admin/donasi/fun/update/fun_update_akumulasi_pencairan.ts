"use server";

import prisma from "@/lib/prisma";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";

export async function AdminDonasi_AkumulasiPencairanById(
  donasiId: string,
  nominalPencairan: number
) {
  const cariDonasi = await prisma.donasi.findFirst({
    where: {
      id: donasiId,
    },
    select: {
      akumulasiPencairan: true,
      totalPencairan: true,
    },
  });

  if (!cariDonasi) return { status: 400, message: "Donasi tidak ditemukan" };

  let akumulasiSementara: number | any = cariDonasi.akumulasiPencairan;
  let totalSementara: number | any = cariDonasi.totalPencairan;

//   console.log(akumulasiSementara, "akumulasi");
//   console.log(totalSementara, "total");

  const hasilTotal = totalSementara + Number(nominalPencairan)
  const hasilAkumulasi = akumulasiSementara + 1;

  const update = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      akumulasiPencairan: hasilAkumulasi,
      totalPencairan: hasilTotal,
    },
  });

  if (!update) return { status: 400, message: "Update akumulasi gagal" };

  return {
    status: 200,
    message: "Berhasil di simpan",
  };
}
