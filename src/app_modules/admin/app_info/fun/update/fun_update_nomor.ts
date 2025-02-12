"use server";

import prisma from "@/lib/prisma";

export default async function adminAppInformation_funUpdateNomorAdmin({
  data,
}: {
  data: any;
}) {
  const updt = await prisma.nomorAdmin.update({
    where: {
      id: data.id,
    },
    data: {
      nomor: data.nomor,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update" };
  return { status: 200, message: "Berhasil update" };
}
