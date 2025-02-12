"use server";

import prisma from "@/lib/prisma";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";
import { MODEL_DONASI_KABAR } from "../../model/interface";

export async function Donasi_funCreateKabar({
  data,
  fileId,
}: {
  data: MODEL_DONASI_KABAR;
  fileId?: string;
}) {
  if (fileId !== undefined) {
    const createWithFile = await prisma.donasi_Kabar.create({
      data: {
        title: data.title,
        deskripsi: data.deskripsi,
        donasiId: data.donasiId,
        imageId: fileId,
      },
    });

    if (!createWithFile) return { status: 400, message: "Gagal disimpan" };
    revalidatePath(RouterDonasi.list_kabar + data.donasiId);
    return {
      status: 200,
      message: "Berhasil disimpan",
      kabarId: createWithFile.id,
    };
  } else {
    const create = await prisma.donasi_Kabar.create({
      data: {
        title: data.title,
        deskripsi: data.deskripsi,
        donasiId: data.donasiId,
      },
    });

    revalidatePath(RouterDonasi.list_kabar + data.donasiId);
    return {
      status: 200,
      message: "Berhasil disimpan",
      kabarId: create.id,
    };
  }
}
