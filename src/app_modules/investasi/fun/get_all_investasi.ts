"use server";

import prisma from "@/lib/prisma";
import moment from "moment";

export async function investasi_funGetAllPublish({ page }: { page: number }) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi.findMany({
    where: {
      masterStatusInvestasiId: "1",
      masterProgresInvestasiId: "1",
    },
    select: {
      id: true,
      MasterPencarianInvestor: true,
      countDown: true,
      progress: true,
    },
  });

  for (let a of data) {
    if (
      (a.MasterPencarianInvestor?.name as any) -
        moment(new Date()).diff(new Date(a.countDown as any), "days") <=
      0
    ) {
      await prisma.investasi.update({
        where: {
          id: a.id,
        },
        data: {
          masterProgresInvestasiId: "3",
        },
      });
    }

    if (a.progress === "100") {
      await prisma.investasi.update({
        where: {
          id: a.id,
        },
        data: {
          masterProgresInvestasiId: "2",
        },
      });
    }
  }

  // cek data yang lewat
  // klo ada,  update status

  const dataFix = await prisma.investasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: [
      {
        masterProgresInvestasiId: "asc",
      },
      {
        countDown: "desc",
      },
    ],
    where: {
      masterStatusInvestasiId: "1",
    },
    include: {
      ProspektusInvestasi: true,
      MasterPembagianDeviden: true,
      MasterPencarianInvestor: true,
      MasterPeriodeDeviden: true,
      MasterProgresInvestasi: true,
    },
  });

  return dataFix;
}
