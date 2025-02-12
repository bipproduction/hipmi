"use server";

import prisma from "@/lib/prisma";
import { update } from "lodash";

export default async function adminDonasi_funUpdatekategoriById({
  kategoriId,
  name,
  
}: {
  kategoriId: string;
  name: string;
  
}) {
  const updt = await prisma.donasiMaster_Kategori.update({
    where: {
      id: kategoriId,
    },
    data: {
      name: name,
      
    },
  });

  if (!updt) return { status: 200, message: "Gagal update" };
  return { status: 200, message: "Berhasil update" };
}
