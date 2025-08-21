"use server";

import { prisma } from "@/lib";
import _ from "lodash";
import { Model_Berita_Investasi } from "../../_lib/interface";
import { revalidatePath } from "next/cache";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";

export async function investasi_funCreateBerita({
  data,
  fileId,
}: {
  data: Model_Berita_Investasi | any;
  fileId?: string;
}) {
  if (fileId != undefined) {
    const createWithFile = await prisma.beritaInvestasi.create({
      data: {
        title: _.startCase(data.title),
        deskripsi: data.deskripsi,
        investasiId: data.investasiId,
        imageId: fileId,
      },
    });

    if (!createWithFile)
      return { status: 400, message: "Gagal menambah berita" };

    revalidatePath(NEW_RouterInvestasi.rekap_berita({ id: data.investasiId }));
    return { status: 201, message: "Berhasil menambah berita" };
  } else {
    const createNoFile = await prisma.beritaInvestasi.create({
      data: {
        title: _.startCase(data.title),
        deskripsi: data.deskripsi,
        investasiId: data.investasiId,
      },
    });

    if (!createNoFile) return { status: 400, message: "Gagal menambah berita" };

    revalidatePath(NEW_RouterInvestasi.rekap_berita({ id: data.investasiId }));
    return { status: 201, message: "Berhasil menambah berita " };
  }
}
