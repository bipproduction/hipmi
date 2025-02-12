"use server";

import prisma from "@/lib/prisma";
import { RouterPortofolio } from "@/lib/router_hipmi/router_katalog";
import { revalidatePath } from "next/cache";

export async function map_funCustomPinMap({
  mapId,
  fileId,
}: {
  mapId: string;
  fileId: string;
}) {
  const updt = await prisma.businessMaps.update({
    where: {
      id: mapId,
    },
    data: {
      pinId: fileId,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update pin" };
  revalidatePath(RouterPortofolio.main_detail);
  return { status: 200, message: "Berhasil update pin" };
}
