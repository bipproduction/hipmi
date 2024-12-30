"use server";

import { prisma } from "@/app/lib";
import _ from "lodash";

export async function notifikasi_funInvestasiChecInvestaorStatus({
  id,
}: {
  id: string;
}) {
  const data = await prisma.investasi_Invoice.findUnique({
    where: {
      id: id,
    },
    select: {
      StatusInvoice: true,
    },
  });

  if (!data)
    return {
      status: 400,
      message: "Investasi tidak ditemukan",
      statusName: "",
    };

  return {
    status: 200,
    message: "Berhasil di cek",
    statusName: _.lowerCase(data.StatusInvoice?.name),
  };
}
