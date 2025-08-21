"use server";

import { prisma } from "@/lib";
import _ from "lodash";

export async function admin_funInvestasiCheckStatus({ id }: { id: string }) {
  const data = await prisma.investasi.findUnique({
    where: {
      id: id,
    },
    select: {
      MasterStatusInvestasi: true,
    },
  });

  if (!data)
    return { status: 400, message: "Id tidak ditemukan", statusName: "" };
  return {
    status: 200,
    message: "Id ditemukan",
    statusName: _.lowerCase(data.MasterStatusInvestasi?.name),
  };
}
