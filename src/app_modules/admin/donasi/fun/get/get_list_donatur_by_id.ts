"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminDonasi_getListDonatur({
  donasiId,
  page,
  selectStatusId,
}: {
  donasiId: string;
  page: number;
  selectStatusId?: string;
}) {
  let takeData = 5;
  let skipData = page * takeData - takeData;

  const getData = await prisma.donasi_Invoice.findMany({
    skip: skipData,
    take: takeData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      donasiId: donasiId,
      donasiMaster_StatusInvoiceId: {
        contains: selectStatusId,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      nominal: true,
      createdAt: true,
      Author: true,
      DonasiMaster_Bank: true,
      DonasiMaster_StatusInvoice: true,
      donasiMaster_StatusInvoiceId: true,
      imagesId: true,
      imageId: true,
    },
  });

  const nCount = await prisma.donasi_Invoice.count({
    where: {
      donasiId: donasiId,
      donasiMaster_StatusInvoiceId: {
        contains: selectStatusId,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: getData,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
