"use server";

import prisma from "@/lib/prisma";
import { MODEL_MASTER_BANK } from "@/app_modules/investasi/_lib/interface"; 

export default async function adminAppInformation_updateDataBankById({
  data,
}: {
  data: MODEL_MASTER_BANK;
}) {
  const updt = await prisma.masterBank.update({
    where: {
      id: data.id,
    },
    data: {
      namaBank: data.namaBank,
      namaAkun: data.namaAkun,
      norek: data.norek,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update" };
  return { status: 200, message: "Berhasil update" };
}
