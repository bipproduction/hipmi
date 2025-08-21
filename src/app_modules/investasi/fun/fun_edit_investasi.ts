"use server";

import prisma from "@/lib/prisma";
import { MODEL_INVESTASI } from "../_lib/interface";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";

export default async function funEditInvestasi(
  formData: FormData,
  data: MODEL_INVESTASI
) {
  const file = formData?.get("file");

  if (file !== "null") {
    const file: any = formData?.get("file");
    const fName = file.name;
    const fExt =
      file && file.name ? _.lowerCase(file.name.split(".").pop()) : "";
    const fRandomName = v4(fName) + "." + fExt;

    const updateImage = await prisma.images.update({
      where: {
        id: data.imagesId,
      },
      data: {
        url: fRandomName,
      },
    });

    if (!updateImage) return { status: 400, message: "Gagal upload gambar" };
    const upFolder : any = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(`./public/investasi/${updateImage.url}`, upFolder);
  }

  const editInves = await prisma.investasi.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      targetDana: "" + data.targetDana,
      hargaLembar: "" + data.hargaLembar,
      totalLembar: "" + data.totalLembar,
      roi: data.roi,
      masterPencarianInvestorId: data.MasterPencarianInvestor.id,
      masterPembagianDevidenId: data.MasterPembagianDeviden.id,
      masterPeriodeDevidenId: data.MasterPeriodeDeviden.id,
    },
  });

  if (!editInves) {
    return {
      status: 400,
      message: "Gagal update",
    };
  }

  revalidatePath(RouterInvestasi_OLD.detail_draft);
  return {
    status: 200,
    message: "Berhasil Disimpan",
  };
}
