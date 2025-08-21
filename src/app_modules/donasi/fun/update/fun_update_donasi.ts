"use server";

import prisma from "@/lib/prisma";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";
import { MODEL_DONASI } from "../../model/interface";

export async function Donasi_funUpdateDonasi({
  data,
  fileId,
}: {
  data: MODEL_DONASI;
  fileId?: string;
}) {
  if (fileId !== undefined) {
    const updateFileId = await prisma.donasi.update({
      where: {
        id: data.id,
      },
      data: {
        imageId: fileId,
      },
    });

    if (!updateFileId) return { status: 400, message: "Gagal update" };
  }

  const update = await prisma.donasi.update({
    where: {
      id: data.id,
    },
    data: {
      donasiMaster_KategoriId: data.donasiMaster_KategoriId,
      donasiMaster_DurasiId: data.donasiMaster_DurasiId,
      title: data.title,
      target: data.target,
    },
  });

  if (!update) return { status: 400, message: "Gagal update" };
  revalidatePath(RouterDonasi.detail_draft);

  return {
    status: 200,
    message: "Berhasil update",
  };
}
