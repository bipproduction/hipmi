"use server";

import prisma from "@/lib/prisma";
import { MODEL_Transaksi_Investasi } from "../_lib/interface";

export default async function funCreateTransaksiInvestasi(
  data: MODEL_Transaksi_Investasi,
  invesId: string,
  authorId: string
) {
  const res = await prisma.transaksiInvestasi.create({
    data: {
      namaBank: data.namaBank,
      nomorRekening: data.nomorRekening,
      investasiId: invesId,
      authorId: authorId,
      gross_amount: "",
      merchant_name:"",
      price: "",
      quantity: ""
    },
  });
  if (!res) return { status: 400, message: "Gagal disimpan" };

  return {
    status: 201,
    message: "Berhasil disimpan",
    res
  };
}
