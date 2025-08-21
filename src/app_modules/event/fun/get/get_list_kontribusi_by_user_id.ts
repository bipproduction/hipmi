"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function event_getListKontibusiByUserId({
  page,
}: {
  page: number;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event_Peserta.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userLoginId,
    },
    select: {
      id: true,
      Event: {
        select: {
          id: true,
          title: true,
          tanggal: true,
          deskripsi: true,
          Author: {
            select: {
              Profile: true,
            },
          },
          Event_Peserta: {
            take: 5,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              userId: true,
              User: {
                select: {
                  Profile: true,
                },
              },
            },
          },
        },
      },
    },
  });
  //   console.log(data);

  return data;
}
