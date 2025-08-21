"use server";

import prisma from "@/lib/prisma";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";
import { revalidatePath } from "next/cache";

export async function adminAppInformation_funUpdateBidangBisnis({
  data,
}: {
  data: { id: string; active?: boolean; name?: string };
}) {
  if (data.name) {
    const updateData = await prisma.masterBidangBisnis.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    if (!updateData) return { status: 400, message: "Gagal update data" };
    revalidatePath(RouterAdminAppInformation.main);
    return { status: 200, message: "Berhasil update data" };
  }

  if (data.active !== null) {
    const updateAktivasi = await prisma.masterBidangBisnis.update({
      where: {
        id: data.id,
      },
      data: {
        active: data.active,
      },
    });

    if (!updateAktivasi)
      return { status: 400, message: "Gagal update aktivasi" };
    revalidatePath(RouterAdminAppInformation.main);
    return { status: 200, message: "Berhasil update aktivasi" };
  }
}
