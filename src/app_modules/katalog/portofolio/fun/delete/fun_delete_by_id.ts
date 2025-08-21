"use server";

import prisma from "@/lib/prisma";
import { MODEL_PORTOFOLIO } from "../../model/interface";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function Portofolio_funDeletePortofolioById(
  data: MODEL_PORTOFOLIO
) {
  const findLogo = await prisma.images.findFirst({
    where: {
      id: data.logoId,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (findLogo) fs.unlinkSync(`./public/portofolio/logo/${findLogo.url}`);

  const deleteLogo = await prisma.images.delete({
    where: {
      id: data.logoId,
    },
  });
  if (!deleteLogo) return { status: 400, message: "Gagal hapus data logo" };

  const deletePortoMedsos = await prisma.portofolio_MediaSosial.delete({
    where: {
      portofolioId: data.id,
    },
  });
  if (!deletePortoMedsos)
    return { status: 400, message: "Gagal hapus data medsos" };

  const deletePortofolio = await prisma.portofolio.delete({
    where: {
      id: data.id,
    },
  });
  if (!deletePortofolio)
    return { status: 400, message: "Gagal hapus portofolio" };
  revalidatePath("/dev/katalog");

  return {
    status: 200,
    message: "Berhasil hapus portofolio",
  };
}
