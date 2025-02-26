"use server";

import prisma from "@/lib/prisma";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import fs from "fs";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { v4 } from "uuid";

export default async function funCreateBeritaInvestasi(
  formData: FormData,
  data: any
) {

  const file: any = formData.get("file");
  const fName = file.name;
  const fExt = _.lowerCase(file.name.split(".").pop());
  const fRandomName = v4(fName) + "." + fExt;

  const upload = await prisma.images.create({
    data: {
      url: fRandomName,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!upload)
    return {
      status: 400,
      message: "File Kosong",
    };

  // const upFolder = Buffer.from(await file.arrayBuffer());
  // fs.writeFileSync(`./public/investasi/${upload.url}`, upFolder);

  const createBerita = await prisma.beritaInvestasi.create({
    data: {
      title: data.title,
      deskripsi: data.deskripsi,
      imagesId: upload.id,
      investasiId: data.investasiId
    },
  });


  if (!createBerita)
    return {
      status: 400,
      message: "Gagal Disimpan",
    };

  revalidatePath(RouterInvestasi_OLD.list_edit_berita);

  return {
    status: 201,
    message: "Berhasil Disimpan",
  };
}
