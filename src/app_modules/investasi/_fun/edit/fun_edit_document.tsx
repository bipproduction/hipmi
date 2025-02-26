"use server";

import { prisma } from "@/lib";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function investasi_funUpdateDocument({
  data,
  fileId,
}: {
  data: MODEL_INVESTASI_DOKUMEN;
  fileId?: string;
}) {
  try {
    fileId !== undefined
      ? await prisma.dokumenInvestasi.update({
          where: {
            id: data.id,
          },
          data: {
            title: data.title,
            fileId: fileId,
          },
        })
      : await prisma.dokumenInvestasi.update({
          where: {
            id: data.id,
          },
          data: {
            title: data.title,
          },
        });
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath(NEW_RouterInvestasi.rekap_dokumen({ id: data.investasiId }));
    return { status: 200, message: "Berhasil Update" };
  }

  //   if (fileId !== undefined) {
  //     const updt = await prisma.dokumenInvestasi.update({
  //       where: {
  //         id: data.id,
  //       },
  //       data: {
  //         title: data.title,
  //         fileId: fileId,
  //       },
  //     });
  //   } else {
  //     const updt = await prisma.dokumenInvestasi.update({
  //       where: {
  //         id: data.id,
  //       },
  //       data: {
  //         title: data.title,
  //       },
  //     });
  //   }
  //    if (!updt) return { status: 400, message: "Gagal Update" };
  //    revalidatePath(NEW_RouterInvestasi.rekap_dokumen({ id: data.investasiId }));
  //    return {
  //      status: 200,
  //      message: "Berhasil Update",
  //    };
}
