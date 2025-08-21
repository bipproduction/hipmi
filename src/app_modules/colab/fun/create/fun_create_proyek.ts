"use server";

import prisma from "@/lib/prisma";
import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";
import { MODEL_COLLABORATION } from "../../model/interface";

export default async function colab_funCreateProyek(
  value: MODEL_COLLABORATION
) {
  try {
    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId) return { status: 400, message: "Gagal Membuat Proyek" };

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
  } catch (error) {
    return { status: 500, message: "Gagal Membuat Proyek" };
  }
}
