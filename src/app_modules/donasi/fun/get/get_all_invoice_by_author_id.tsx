"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function donasi_funGetAllInvoiceByAuthorId({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.donasi_Invoice.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: userLoginId,
    },
    select: {
      id: true,
      nominal: true,
      DonasiMaster_StatusInvoice: true,
      donasiMaster_StatusInvoiceId: true,
      Donasi: {
        select: {
          id: true,
          title: true,
          target: true,
          progres: true,
          authorId: true,
          imagesId: true,
          publishTime: true,
          donasiMaster_KategoriId: true,
          donasiMaster_DurasiId: true,
          donasiMaster_StatusDonasiId: true,
          imageDonasi: true,
          DonasiMaster_Ketegori: true,
          DonasiMaster_Durasi: true,
          DonasiMaster_Status: true,
          imageId: true,
        },
      },
    },
  });

  return data;
}
