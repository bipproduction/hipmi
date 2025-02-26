"use server";

import prisma from "@/lib/prisma";
import { tree } from "next/dist/build/templates/app-page";

export async function donasi_funGetAllPublish({ page }: { page: number }) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.donasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      publishTime: "desc",
    },
    where: {
      donasiMaster_StatusDonasiId: "1",
      active: true,
    },
    include: {
      Author: true,
      CeritaDonasi: true,
      DonasiMaster_Ketegori: true,
      DonasiMaster_Durasi: true,
      DonasiMaster_Status: true,
      Donasi_Invoice: true,
      Donasi_Kabar: true,
      Donasi_PencairanDana: true,
    },
  });

  return data;
}
