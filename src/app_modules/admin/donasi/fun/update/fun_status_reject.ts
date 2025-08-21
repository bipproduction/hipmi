"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";

export async function AdminDonasi_funUpdateStatusReject(
  donasiId: string,
  statusId: string,
  catatan: string
) {
  const data = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      donasiMaster_StatusDonasiId: statusId,
      catatan: catatan,
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

  if (!data) return { status: 400, message: "Data tidak ditemukan" };
  revalidatePath(RouterAdminDonasi.table_review);
  return {
    data: data,
    status: 200,
    message: "Status berhasil diganti",
  };
}
