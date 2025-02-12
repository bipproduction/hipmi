"use server";

import prisma from "@/lib/prisma";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";

/**
 *
 * @param donasiId | string
 * @param statusId | string | 1 - 4
 * @tutorial id_and_statusName | Publish "1", Review "2, Draft "3", Reject "4"
 * @returns ganti status donasi
 */
export async function Donasi_funGantiStatus(
  donasiId: string,
  statusId: string
) {
  const data = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      donasiMaster_StatusDonasiId: statusId,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      DonasiMaster_Status: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!data) return { status: 400, message: "Data tidak ditemukan" };

  revalidatePath(RouterDonasi.status_galang_dana({ id: "" }));
  return {
    data: data,
    status: 200,
    message: "Status berhasil diganti",
  };
}
