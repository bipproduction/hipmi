"use server";

import prisma from "@/lib/prisma";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function investasi_funEditStatusById({
  investasiId,
  statusId,
}: {
  investasiId: string;
  statusId: string;
}) {
  const res = await prisma.investasi.update({
    where: {
      id: investasiId,
    },
    data: {
      masterStatusInvestasiId: statusId,
    },
    select: {
        id: true,
        title: true,
        authorId: true,
        MasterStatusInvestasi: {
            select: {
                name: true
            }
        }   
    }
  });

  if (!res) return { status: 400, message: "Gagal Update" };
  revalidatePath(RouterInvestasi_OLD.main_porto);
  return {
    data: res,
    status: 200,
    message: "Update Berhasil",
  };
}
