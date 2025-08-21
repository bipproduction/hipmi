"use server";

import prisma from "@/lib/prisma";
import { RouterPortofolio } from "@/lib/router_hipmi/router_katalog";
import { revalidatePath } from "next/cache";
import { MODEL_MAP } from "../../lib/interface";

export async function map_funEditMap({
  data,
  fileId,
}: {
  data: MODEL_MAP;
  fileId?: string;
}) {
  if (fileId === undefined || fileId === null) {
    const updt = await prisma.businessMaps.update({
      where: {
        id: data.id,
      },
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        namePin: data.namePin,
      },
    });
    if (!updt) return { status: 400, message: "Gagal update data" };
    revalidatePath(RouterPortofolio.main_detail);
    return { status: 200, message: "Berhasil update" };
  } else {
    const updt = await prisma.businessMaps.update({
      where: {
        id: data.id,
      },
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        namePin: data.namePin,
        imageId: fileId,
      },
    });
    if (!updt) return { status: 400, message: "Gagal update data" };
    revalidatePath(RouterPortofolio.main_detail);
    return { status: 200, message: "Berhasil update" };
  }
}
