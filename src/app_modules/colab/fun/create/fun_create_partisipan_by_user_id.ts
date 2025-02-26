"use server";

import prisma from "@/lib/prisma";
import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";

export default async function colab_funCreatePartisipan({
  id,
  deskripsi,
}: {
  id: string;
  deskripsi: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  if (userLoginId == null) {
    return {
      status: 500,
      message: "Gagal mendapatkan data, user id tidak ada",
    };
  }

  const create = await prisma.projectCollaboration_Partisipasi.create({
    data: {
      projectCollaborationId: id,
      userId: userLoginId,
      deskripsi_diri: deskripsi,
    },
    select: {
      ProjectCollaboration: {
        select: {
          id: true,
          title: true,
          userId: true,
        },
      },
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan partisipan" };
  revalidatePath(RouterColab.main_detail + id);
  return {
    data: create,
    status: 201,
    message: "Berhasil menambahkan partisipan",
  };
}
