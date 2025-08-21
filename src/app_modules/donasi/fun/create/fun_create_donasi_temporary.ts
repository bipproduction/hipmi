"use server";

import prisma from "@/lib/prisma";
import { MODEL_DONASI } from "../../model/interface";

interface Model_Temporary {
  kategoriId: "";
  title: "";
  target: "";
  durasiId: "";
}

export default async function Donasi_funCreateTemporary({
  data,
  fileId,
}: {
  data: MODEL_DONASI;
  fileId: string;
}) {

  const res = await prisma.donasi_TemporaryCreate.create({
    data: {
      title: data.title,
      target: data.target,
      donasiMaster_KategoriId: data.donasiMaster_KategoriId,
      donasiMaster_DurasiId: data.donasiMaster_DurasiId,
      imageId: fileId,
    },
  });

  if (!res) return { status: 400, message: "Gagal membuat donasi" };

  return {
    status: 201,
    message: "Berhasil membuat donasi",
    donasiId: res.id,
  };
}
