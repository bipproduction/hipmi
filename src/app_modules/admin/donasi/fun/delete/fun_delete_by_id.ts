"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { revalidatePath } from "next/cache";

export default async function adminDonasi_funDeleteKategori({
  kategoriId,
  isActive,
}: {
  kategoriId: string;
  isActive: boolean;
}) {
  const del = await prisma.donasiMaster_Kategori.update({
    where: {
      id: kategoriId,
    },
    data: {
      active: isActive,
    },
  });

  if (!del) return { status: 400, message: "Gagal hapus kategori" };
  revalidatePath(RouterAdminDonasi.table_kategori);
  return { status: 200, message: "Kategori terhapus" };
}
