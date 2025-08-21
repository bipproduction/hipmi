"use server";

import prisma from "@/lib/prisma";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export async function Donasi_funCreateNotif(donasiId: string, kabarId: string) {
  const dataDonatur = await prisma.donasi_Invoice.findMany({
    where: {
      donasiId: donasiId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  const group = _.map(_.groupBy(dataDonatur, "authorId"), (v: any) => ({
    authorId: v[0].authorId,
  }));

  // console.log(donasiId,dataDonatur, group);

  const createNotif = group.map(
    async (e) =>
      await prisma.donasi_Notif.create({
        data: {
          userId: e.authorId,
          donasi_KabarId: kabarId,
        },
      })
  );

  if (!createNotif) return { status: 400, message: "Gagal membuat notif" };
  revalidatePath(RouterDonasi.main_beranda);
  return {
    status: 200,
    message: "Notif terkirim",
  };
}
