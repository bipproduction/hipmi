"use server";

import prisma from "@/lib/prisma";
import {
  NEW_RouterInvestasi
} from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export default async function funDeleteInvestasi(id: string) {
  const res = await prisma.investasi.delete({
    where: {
      id: id,
    },
  });

  if (!res) return { status: 400, message: "Gagal Hapus Data" };

  revalidatePath(NEW_RouterInvestasi.portofolio({ id: "3" }));
  revalidatePath(NEW_RouterInvestasi.portofolio({ id: "4" }));

  return {
    status: 200,
    message: "Berhasil Hapus",
  };
}
