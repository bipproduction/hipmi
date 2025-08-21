"use server";

import prisma from "@/lib/prisma";
import { RouterMap } from "@/lib/router_hipmi/router_map";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function map_funCreatePin({
  data,
}: {
  data: Prisma.BusinessMapsCreateInput;
}) {
  const userLoginId = await funGetUserIdByToken();

  const create = await prisma.businessMaps.create({
    data: {
      latitude: data.latitude,
      longitude: data.longitude,
      namePin: data.namePin,
      portofolioId: data.Portofolio?.create?.id,
      authorId: userLoginId,
      imageId: data.imageId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan" };

  revalidatePath(RouterMap.main_view);
  return { status: 200, message: "Berhasil menambahkan" };
}
