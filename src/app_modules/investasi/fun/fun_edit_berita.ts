"use server";

import prisma from "@/lib/prisma";
import { Model_Berita_Investasi } from "../_lib/interface";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";

export default async function funEditBeritaInvestasi(
  formData: FormData,
  data: Model_Berita_Investasi
) {
  const fl = formData.get("file");

  if (fl !== "null") {
    const file: any = formData.get("file");
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
    const upFolder = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(`./public/investasi/${updateImage.url}`, upFolder);
    revalidatePath("/dev/investasi/list_edit_berita"); 
  }

  const res = await prisma.beritaInvestasi.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      deskripsi: data.deskripsi,
    },
  });

  if (!res) return { status: 400, message: "Gagal Update" };
  revalidatePath("/dev/investasi/list_edit_berita");
  return {
    status: 200,
    message: "Berhasil Update",
  };
}
