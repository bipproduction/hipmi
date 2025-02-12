"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";

export default async function Admin_getPublishProgresInvestasi() {
  const data = await prisma.investasi.findMany({
    orderBy: {
      updatedAt: "desc"
    },
    where: {
      MasterStatusInvestasi: {
        name: "Publish",
      },
    },

    select: {
      id: true,

      author: {
        select: {
          username: true,
        },
      },
      updatedAt: true,
      targetDana: true,
      progress: true,
    },
  });

  //   console.log(data)
  return data;
}
