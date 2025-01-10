"use server";

import prisma from "@/app/lib/prisma";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";
import { MODEL_COLLABORATION } from "../../model/interface";

export default async function colab_funCreateProyek(
  value: MODEL_COLLABORATION
) {
  const userLoginId = await funGetUserIdByToken();

  const data = await prisma.projectCollaboration.create({
    data: {
      title: value.title,
      lokasi: value.lokasi,
      purpose: value.purpose,
      benefit: value.benefit,
      projectCollaborationMaster_IndustriId:
        value.projectCollaborationMaster_IndustriId,
      userId: userLoginId,
      // jumlah_partisipan: + value.jumlah_partisipan,
    },
  });

  if (!data) return { status: 400, message: "Gagal Membuat Proyek" };
  revalidatePath(RouterColab.beranda);
  return { data, status: 201, message: "Berhasil Membuat Proyek" };
}
