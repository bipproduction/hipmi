"use server";

import { prisma } from "@/lib";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

type ICreateDocument = {
  investasiId: string;
  title: string;
  fileId: string;
};
export async function investasi_funCreateDocument({
  data,
}: {
  data: ICreateDocument;
}) {
  const create = await prisma.dokumenInvestasi.create({
    data: {
      investasiId: data.investasiId,
      title: data.title,
      fileId: data.fileId,
    },
  });

  if (!create) return { status: 400, message: "Gagal membuat dokumen" };
  revalidatePath(NEW_RouterInvestasi.rekap_dokumen({ id: data.investasiId }));
  return { status: 201, message: "Berhasil membuat dokumen" };
}
