"use server";

import { prisma } from "@/lib";
import { MODEL_DONASI_KABAR } from "../../model/interface";
import { revalidatePath } from "next/cache";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";

export async function donasi_funUpdateKabar({
  data,
  fileId,
}: {
  data: MODEL_DONASI_KABAR;
  fileId?: string;
}) {
  if (fileId !== undefined) {
    const updt = await prisma.donasi_Kabar.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        deskripsi: data.deskripsi,
        imageId: fileId,
      },
    });

    if (!updt) return { status: 400, message: "Gagal Update" };
    revalidatePath(RouterDonasi.update_kabar + data.id);
    return { status: 200, message: "Berhasil Update" };
  } else {
    const updt = await prisma.donasi_Kabar.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        deskripsi: data.deskripsi,
      },
    });

    if (!updt) return { status: 400, message: "Gagal Update" };
    revalidatePath(RouterDonasi.update_kabar + data.id);
    return { status: 200, message: "Berhasil Update" };
  }
}
