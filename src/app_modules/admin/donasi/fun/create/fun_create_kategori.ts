"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { revalidatePath } from "next/cache";

export default async function adminDonasi_funCreateKategori({
  newKategori,
}: {
  newKategori: string;
}) {
  const getCount = await prisma.donasiMaster_Kategori.findMany({});
  const idKategori = getCount.length + 1;

  const create = await prisma.donasiMaster_Kategori.create({
    data: {
      id: idKategori.toString(),
      name: newKategori,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan" };
  revalidatePath(RouterAdminDonasi.table_kategori);
  return { status: 200, message: "Berhasil menambahkan" };
}
