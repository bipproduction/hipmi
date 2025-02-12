"use server";

import prisma from "@/lib/prisma";
import { MODEL_DONASI_PENCAIRAN_DANA } from "@/app_modules/donasi/model/interface";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function AdminDonasi_funCreatePencairanDana({
  data,
  fileId,
}: {
  data: MODEL_DONASI_PENCAIRAN_DANA;
  fileId: string;
}) {
  // const dataImage: any = gambar.get("file");
  // const fileName = dataImage.name;
  // const fileExtension = _.lowerCase(dataImage.name.split(".").pop());
  // const fRandomName = v4(fileName) + "." + fileExtension;

  // const uploadBukti = await prisma.images.create({
  //   data: {
  //     url: fRandomName,
  //   },
  //   select: {
  //     id: true,
  //     url: true,
  //   },
  // });

  // if (!uploadBukti) return { status: 400, message: "Gagal upload gambar" };
  // const uploadFolder = Buffer.from(await dataImage.arrayBuffer());
  // fs.writeFileSync(
  //   `./public/donasi/pencairan/${uploadBukti.url}`,
  //   uploadFolder
  // );

  const createPencairan = await prisma.donasi_PencairanDana.create({
    data: {
      nominalCair: +data.nominalCair,
      deskripsi: data.deskripsi,
      title: data.title,
      donasiId: data.donasiId,
      imageId: fileId,
    },
  });

  if (!createPencairan) return { status: 400, message: "Gagal membuat data" };
  revalidatePath("/dev/admin/donasi/detail/publish");
  return {
    status: 200,
    message: "Berhasil",
  };
}
