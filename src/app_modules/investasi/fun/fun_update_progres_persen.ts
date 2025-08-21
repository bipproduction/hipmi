"use server";
import { MODEL_INVESTASI } from "../_lib/interface";
import moment from "moment";
import prisma from "@/lib/prisma";

export default async function funUpadteProgresPersenInvestasi(data: MODEL_INVESTASI) {
    // console.log(data)
  if (data.MasterProgresInvestasi.id !== "2" && data.progress === "100") {
    const res = await prisma.investasi.update({
      where: {
        id: data.id,
      },
      data: {
        masterProgresInvestasiId: "2",
      },
    });
    // console.log(res);
    return res;
  }
}
