"use server";

import prisma from "@/lib/prisma";
import { MODEL_PORTOFOLIO } from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Portofolio_funEditDataBisnis(data: MODEL_PORTOFOLIO) {
  const res = await prisma.portofolio.update({
    where: {
      id: data.id,
    },
    data: {
      namaBisnis: data.namaBisnis,
      alamatKantor: data.alamatKantor,
      tlpn: data.tlpn,
      deskripsi: data.deskripsi,
      masterBidangBisnisId: data.MasterBidangBisnis.id,
    },
  });

  if (!res) return { status: 400, message: "Gagal update" };
  revalidatePath("/dev/portofolio/main/")
  return {
    status: 200,
    message: "Update berhasil",
  };
}
