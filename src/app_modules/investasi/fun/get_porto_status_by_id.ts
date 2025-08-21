"use server";

import prisma from "@/lib/prisma";

export default async function getPortoByStatusId(id: string, statusId: number) {
  // Draft
  if (statusId === 1) {
    const data = await prisma.investasi.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        authorId: id,
        MasterStatusInvestasi: {
          name: "Draft",
        },
      },
      select: {
        id: true,
        title: true,
        imagesId: true,
        // hargaLembar: true,
        targetDana: true,
        // totalLembar: true,
        // roi: true,
        // active: true,
        // MasterStatusInvestasi: true,
        // BeritaInvestasi: true,
        // DokumenInvestasi: true,
        // ProspektusInvestasi: true,
        // MasterPembagianDeviden: true,
        // MasterPencarianInvestor: true,
        // MasterPeriodeDeviden: true,
        // SahamTerbeli: true,
      },
    });
    return data;
  }

  // Review
  if (statusId === 2) {
    const data = await prisma.investasi.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        authorId: id,
        MasterStatusInvestasi: {
          name: "Review",
        },
      },
      select: {
        id: true,
        title: true,
        imagesId: true,
        targetDana: true,
      },
    });
    return data;
  }

  // Publish
  if (statusId === 3) {
    const data = await prisma.investasi.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        authorId: id,
        MasterStatusInvestasi: {
          name: "Publish",
        },
      },
      select: {
        id: true,
        title: true,
        imagesId: true,
        updatedAt: true,
        targetDana: true,
        MasterPencarianInvestor: true,
        countDown: true,
      },
    });
    return data;
  }

  // Reject
  if (statusId === 4) {
    const data = await prisma.investasi.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        authorId: id,
        MasterStatusInvestasi: {
          name: "Reject",
        },
      },
      select: {
        id: true,
        title: true,
        imagesId: true,
        targetDana: true
      },
    });
    return data;
  }
}
