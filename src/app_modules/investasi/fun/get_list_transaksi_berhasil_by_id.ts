"use server";

import prisma from "@/lib/prisma";

export default async function getListTransaksiBerhasilInvestasi(
  idAuthor: string
) {
  const data = await prisma.transaksiInvestasi.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: idAuthor,
      status_code: "200",
    },
    select: {
      id: true,
      Investasi: {
        select: {
          author: {
            select: {
              username: true,
              Profile: {
                select: {
                  userId: true,
                  imageId: true
                },
              },
            },
          },
          imagesId: true,
          title: true,
          totalLembar: true,
          sisaLembar: true,
        },
      },
      Author: true,
      gross_amount: true,
      quantity: true,
    },
  });

  return data;
}
