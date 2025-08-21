"use server";

import prisma from "@/lib/prisma";
import { MODEL_PORTOFOLIO_MEDSOS } from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Portofolio_funEditMedsosById(
  data: MODEL_PORTOFOLIO_MEDSOS
) {
  const res = await prisma.portofolio_MediaSosial.update({
    where: {
      id: data.id,
    },
    data: {
      facebook: data.facebook,
      instagram: data.instagram,
      tiktok: data.tiktok,
      twitter: data.twitter,
      youtube: data.youtube,
    },
  });

  if (!res) return { status: 400, message: "Gagal update" };
  revalidatePath("/dev/portofolio/main");
  return {
    status: 200,
    message: "Berhasil update",
  };
}
