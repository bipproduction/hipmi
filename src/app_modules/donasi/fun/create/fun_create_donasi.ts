"use server";

import prisma from "@/lib/prisma";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";
import { MODEL_DONASI } from "../../model/interface";
import { Donasi_funDeleteTemporaryCreate } from "../delete/fun_delete_temporary_create";

export async function Donasi_funCreate({
  data,
  fileId,
}: {
  data: MODEL_DONASI;
  fileId: string;
}) {
  const dataDonasi = await prisma.donasi.create({
    data: {
      target: data.target,
      title: data.title,
      donasiMaster_DurasiId: data.donasiMaster_DurasiId,
      donasiMaster_KategoriId: data.donasiMaster_KategoriId,
      authorId: data.authorId,
      namaBank: data.namaBank,
      rekening: data.rekening,
      imageId: data.imageId,
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

  if (!dataDonasi) return { status: 400, message: "Gagal disimpan" };
  await Donasi_funDeleteTemporaryCreate(data.id);

  const dataCerita = await prisma.donasi_Cerita.create({
    data: {
      donasiId: dataDonasi.id,
      pembukaan: data.CeritaDonasi.pembukaan,
      cerita: data.CeritaDonasi.cerita,
      imageId: fileId,
    },
  });

  if (!dataCerita) return { status: 400, message: "Gagal simpan data cerita" };
  revalidatePath(RouterDonasi.penggalang_dana);
  return {
    data: dataDonasi,
    status: 201,
    message: "Data donasi tersimpan",
  };
}
