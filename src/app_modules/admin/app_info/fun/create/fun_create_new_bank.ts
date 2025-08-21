"use server";

import prisma from "@/lib/prisma";
import { MODEL_MASTER_BANK } from "@/app_modules/investasi/_lib/interface";

export default async function adminAppInformation_createBank({
  data,
}: {
  data: MODEL_MASTER_BANK;
}) {
  const count = await prisma.masterBank.count({});
  const idBank = count + 1;

  const create = await prisma.masterBank.create({
    data: {
      id: idBank.toString(),
      namaBank: data.namaBank,
      namaAkun: data.namaAkun,
      norek: data.norek,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan" };
  return { status: 200, message: "Berhasil menambahkan" };
}
