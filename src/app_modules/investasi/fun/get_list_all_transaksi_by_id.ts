"use server";

import prisma from "@/lib/prisma";
import moment from "moment";
import { MODEL_Transaksi_Investasi } from "../_lib/interface";
import funGantiStatusTransaksi_Investasi from "./fun_ganti_status_transaksi";

export default async function getListAllTransaksiById_Investasi(
  userId: string
) {
  const data = await prisma.transaksiInvestasi.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      namaBank: true,
      nomorRekening: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      quantity: true,
      price: true,
      gross_amount: true,
      merchant_name: true,
      redirect_url: true,
      token: true,

      Author: true,
      masterStatusTransaksiInvestasiId: true,
      MasterStatusTransaksiInvestasi: true,
      investasiId: true,
      Investasi: true,
    },
  });

  for (let e of data) {
    cekWaktu(e as any)
  }

  async function cekWaktu(data: MODEL_Transaksi_Investasi) {
    // console.log(data)
    const selesai = moment(data.createdAt).add(1, "days").format();
    const skrng = moment(new Date());
    const sisaWaktu = moment(selesai).diff(skrng);

    if (sisaWaktu <= 0) {
      await funGantiStatusTransaksi_Investasi(data.id, "4")
    }
  }

  const dataBaru = await prisma.transaksiInvestasi.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      namaBank: true,
      nomorRekening: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      quantity: true,
      price: true,
      gross_amount: true,
      merchant_name: true,
      redirect_url: true,
      token: true,
      Author: true,
      masterStatusTransaksiInvestasiId: true,
      MasterStatusTransaksiInvestasi: true,
      investasiId: true,
      Investasi: true,
    },
  });

  return dataBaru
}
