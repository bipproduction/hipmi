"use server";

import prisma from "@/lib/prisma";
import { ceil } from "lodash";

export async function adminVote_funGetListReject({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  let takeData = 10;
  let skipData = page * takeData - takeData;

  const data = await prisma.voting.findMany({
    skip: skipData,
    take: takeData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      voting_StatusId: "4",
      isActive: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      Author: {
        select: {
          id: true,
          username: true,
          Profile: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      Voting_Kontributor: true,
      Voting_DaftarNamaVote: true,
    },
  });

  const nCount = await prisma.voting.count({
    where: {
      voting_StatusId: "4",
      isActive: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: data,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
