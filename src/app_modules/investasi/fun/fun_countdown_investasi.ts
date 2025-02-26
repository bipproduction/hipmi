"use server";

import prisma from "@/lib/prisma";
import moment from "moment";
import funGantiStatusTransaksi_Investasi from "./fun_ganti_status_transaksi";
import { MODEL_Transaksi_Investasi } from "../_lib/interface";

export default async function funCountDown(data: MODEL_Transaksi_Investasi) {
  // const res = await prisma.transaksiInvestasi.findMany({
  //   where: {
  //     id: data.id,
  //   },
  // });

  // if (!res) return { status: 400 };

  // const selesai = moment(data.createdAt).add(1, "days").format();
  // let durasi = moment.duration(moment(selesai).diff(new Date()));
  // const timer = setInterval(() => {
  //   durasi = moment.duration(+durasi - 1000, "milliseconds");
  //   // console.log(d.days(), "=", d.hours(), d.minutes(), d.seconds());
  //   if (durasi.hours() <= 0 && durasi.minutes() <= 0 && durasi.seconds() <= 0) {
  //     funGantiStatusTransaksi_Investasi(data.id, "4");
  //     clearInterval(timer);
  //     return {
  //       status: 200,
  //     };
  //   }
  // }, 1000);
}
