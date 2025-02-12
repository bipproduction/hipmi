"use server";

import prisma from "@/lib/prisma";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function adminInvestasi_funEditStatusPublishById({
  investasiId,
  statusId,
  progesInvestasiId,
}: {
  investasiId: string;
  statusId: string;
  progesInvestasiId: string;
}) {
  const cekStatus = await prisma.investasi.findFirst({
    where: {
      id: investasiId,
    },
    select: {
      masterStatusInvestasiId: true,
    },
  });

  if (cekStatus?.masterStatusInvestasiId !== "2") {
    return {
      status: 400,
      message: "User membatalkan review",
    };
  }

  const publishTime = new Date();
  const res = await prisma.investasi.update({
    where: {
      id: investasiId,
    },
    data: {
      countDown: publishTime,
      masterStatusInvestasiId: statusId,
      masterProgresInvestasiId: progesInvestasiId,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      MasterStatusInvestasi: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!res) return { status: 400, message: "Gagal Update" };
  revalidatePath(RouterInvestasi_OLD.portofolio);

  return {
    data: res,
    status: 200,
    message: "Publish Berhasil",
  };
}
