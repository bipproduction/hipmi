"use server";

import prisma from "@/lib/prisma";
/**
 *
 * @param status progres > 1 - 3
 * @type string
 * @returns data publish menurut status progresnya
 */
export async function getListAllPublish(status : string) {

  if (status === "1") {
    const data = await prisma.investasi.findMany({
      orderBy: {
        countDown: "asc",
      },
      where: {
        MasterStatusInvestasi: {
          name: {
            equals: "Publish",
          },
        },
        AND: {
          MasterProgresInvestasi: {
            id: "1",
          },
        },
      },
      select: {
        id: true,
        title: true,
        authorId: true,
        hargaLembar: true,
        targetDana: true,
        totalLembar: true,
        sisaLembar: true,
        progress: true,
        roi: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        imagesId: true,
        // MasterStatusInvestasi: true,
        // BeritaInvestasi: true,
        // DokumenInvestasi: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
        MasterProgresInvestasi: true,
        countDown: true,
      },
    });
    return data;
  }
  if (status === "2") {
    const data = await prisma.investasi.findMany({
      orderBy: {
        masterPencarianInvestorId: "asc",
      },
      where: {
        MasterStatusInvestasi: {
          name: {
            equals: "Publish",
          },
        },
        AND: {
          MasterProgresInvestasi: {
            id: "2",
          },
        },
      },
      select: {
        id: true,
        title: true,
        authorId: true,
        hargaLembar: true,
        targetDana: true,
        totalLembar: true,
        sisaLembar: true,
        progress: true,
        roi: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        imagesId: true,
        // MasterStatusInvestasi: true,
        // BeritaInvestasi: true,
        // DokumenInvestasi: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
        countDown: true,
      },
    });
    return data
  }
  if (status === "3") {
    const data = await prisma.investasi.findMany({
      orderBy: {
        masterPencarianInvestorId: "asc",
      },
      where: {
        MasterStatusInvestasi: {
          name: {
            equals: "Publish",
          },
        },
        AND: {
          MasterProgresInvestasi: {
            id: "3",
          },
        },
      },
      select: {
        id: true,
        title: true,
        authorId: true,
        hargaLembar: true,
        targetDana: true,
        totalLembar: true,
        sisaLembar: true,
        progress: true,
        roi: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        imagesId: true,
        // MasterStatusInvestasi: true,
        // BeritaInvestasi: true,
        // DokumenInvestasi: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
        countDown: true,
      },
    });
    return data
  }
}
