"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function portofolio_funEditLogoBisnisById({
  portofolioId,
  logoId,
}: {
  portofolioId: string;
  logoId: string;
}) {
  const updatePorto = await prisma.portofolio.update({
    where: {
      id: portofolioId,
    },
    data: {
      logoId: logoId,
    },
  });

  if (!updatePorto) return { status: 200, message: "Update gagal" };
  revalidatePath("/dev/portofolio/edit/logo");
  revalidatePath("/dev/portofolio/main");
  return {
    status: 200,
    message: "Berhasil mengubah Logo Bisnis!",
  };
}
