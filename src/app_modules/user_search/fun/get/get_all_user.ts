"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function userSearch_getAllUser({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 20;
  const skipData = page * takeData - takeData;

  const data = await prisma.user.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      username: "asc",
    },
    where: {
      active: true,
      masterUserRoleId: "1",
      Profile: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },

      NOT: {
        Profile: null,
      },
      OR: [
        {
          NOT: {
            id: userLoginId as string,
          },
        },
      ],
    },
    include: {
      Profile: {
        select: {
          id: true,
          name: true,
          imageId: true,
        },
      },
    },
  });

  return data;
}
