"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";

export async function AdminDonasi_funUpdateStatusPublish(
  donasiId: string,
  statusId: string
) {
  const publishTime = Date.now();

  const data = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      donasiMaster_StatusDonasiId: statusId,
      publishTime: new Date(publishTime),
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      DonasiMaster_Status: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!data) {
    await prisma.$disconnect();
    return { status: 400, message: "Data tidak ditemukan" };
  }

  revalidatePath(RouterAdminDonasi.table_review);
  await prisma.$disconnect();

  return {
    data: data,
    status: 200,
    message: "Status berhasil diganti",
  };
}
