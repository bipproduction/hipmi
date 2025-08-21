"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";

export default async function funUploadDokumenInvestasi(
  formData: FormData,
  data: any
) {

  const file: any = formData.get("file");
  const fName = file.name;
  const fExt = _.lowerCase(file.name.split(".").pop());
  // console.log(fName)
  // console.log(fExt)
  const fRandomName = v4(fName) + "." + fExt;

  const uploadFile = await prisma.dokumenInvestasi.create({
    data: {
      investasiId: data.idInves,
      title: data.title,
      url: fRandomName,
    },
  });

  if (!uploadFile) return { status: 400, message: "Gagal Upload" };
  const upFolder = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/file/${uploadFile.url}`, upFolder);

  revalidatePath(RouterInvestasi_OLD.edit_dokumen);
  return {
    status: 201,
    message: "File tersimpan ",
  };
}
