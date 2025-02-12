"use server";
import { MODEL_INVESTASI } from "../_lib/interface";
import moment from "moment";
import prisma from "@/lib/prisma";

export default async function funUpadteProgresWaktuInvestasi(data: MODEL_INVESTASI) {

  const pencarian = data.MasterPencarianInvestor.name;
  const countD = moment(new Date()).diff(new Date(data.countDown), "days");

  if (+pencarian - +countD <= 0) {
    const res = await prisma.investasi.update({
      where: {
        id: data.id,
      },
      data: {
        masterProgresInvestasiId: "3",
      },
    });
    // console.log(res);
    return res;
  }
}
