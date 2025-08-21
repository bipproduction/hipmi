"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import _ from "lodash";

type ICategoryapp =
  | "Semua"
  | "Event"
  | "Job"
  | "Voting"
  | "Donasi"
  | "Investasi"
  | "Forum"
  | "Collaboration";

export default async function notifikasi_getByUserId({
  page,
  kategoriApp,
}: {
  page: number;
  kategoriApp?: ICategoryapp;
}) {
  const userLoginId = await funGetUserIdByToken();
  const takeData = 10;
  const skipData = page * takeData - takeData;

  if (kategoriApp === "Semua") {
    const data = await prisma.notifikasi.findMany({
      take: takeData,
      skip: skipData,
      orderBy: [
        {
          isRead: "asc",
        },
        { createdAt: "desc" },
      ],
      where: {
        userId: userLoginId,
        userRoleId: "1",
      },
    });

    return data;
  }

  const allData = await prisma.notifikasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: [
      {
        isRead: "asc",
      },
      { createdAt: "desc" },
    ],
    where: {
      userId: userLoginId,
      userRoleId: "1",
      kategoriApp: _.upperCase(kategoriApp),
    },
  });

  return allData;
}
