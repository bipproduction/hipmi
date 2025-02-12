"use server";

import prisma from "@/lib/prisma";
import { MODEL_COLLABORATION } from "../../model/interface";
import { revalidatePath } from "next/cache";
import { RouterColab } from "@/lib/router_hipmi/router_colab";

export default async function colab_funEditById(value: MODEL_COLLABORATION) {
  console.log(value);
  const updt = await prisma.projectCollaboration.update({
    where: {
      id: value.id,
    },
    data: {
      title: value.title,
      lokasi: value.lokasi,
      purpose: value.purpose,
      benefit: value.benefit,
      // jumlah_partisipan: value.jumlah_partisipan,
      projectCollaborationMaster_IndustriId: value
        .ProjectCollaborationMaster_Industri.id as any,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update" };
  revalidatePath(RouterColab.beranda);
  revalidatePath(RouterColab.main_detail);
  return { status: 200, message: "Berhasil update" };
}
