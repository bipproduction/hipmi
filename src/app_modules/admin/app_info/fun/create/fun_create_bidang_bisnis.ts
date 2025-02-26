"use server";

import prisma from "@/lib/prisma";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";
import { revalidatePath } from "next/cache";

export async function adminAppInformation_funCreateBidangBisnis({
  name,
}: {
  name: string;
}) {
  const count = await prisma.masterBidangBisnis.count({});
  const idBidangBisnis = count + 1;

  const createData = await prisma.masterBidangBisnis.create({
    data: {
      id: idBidangBisnis.toString(),
      name: name,
    },
  });

  if (!createData) return { status: 400, message: "Gagal menambahkan" };
  revalidatePath(RouterAdminAppInformation.main);
  return { status: 201, message: "Berhasil menambahkan" };
}
