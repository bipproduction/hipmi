"use server";

import { prisma } from "@/lib";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { MODEL_INVESTASI } from "../../_lib/interface";

export async function investasi_funUpdateInvestasi({
  data,
  imageId,
  totalLembar,
}: {
  data: MODEL_INVESTASI;
  imageId?: string;
  totalLembar: string;
}) {
  //   console.log(data);
  //   console.log(imageId);
  //   console.log(totalLembar);

  if (imageId !== undefined) {
    const updtWithImage = await prisma.investasi.update({
      where: {
        id: data.id,
      },
      data: {
        title: _.startCase(data.title),
        targetDana: data.targetDana,
        hargaLembar: data.hargaLembar,
        totalLembar: totalLembar,
        sisaLembar: totalLembar,
        roi: data.roi,
        masterPembagianDevidenId: data.masterPembagianDevidenId,
        masterPeriodeDevidenId: data.masterPeriodeDevidenId,
        masterPencarianInvestorId: data.masterPencarianInvestorId,
        imageId: imageId,
      },
    });

    if (!updtWithImage) return { status: 400, message: "Gagal update data" };
    revalidatePath("/dev/investasi/detail/portofolio/");

    return { status: 200, message: "Berhasil update" };
  } else {
    const updtNoImage = await prisma.investasi.update({
      where: {
        id: data.id,
      },
      data: {
        title: _.startCase(data.title),
        targetDana: data.targetDana,
        hargaLembar: data.hargaLembar,
        totalLembar: totalLembar,
        sisaLembar: totalLembar,
        roi: data.roi,
        masterPembagianDevidenId: data.masterPembagianDevidenId,
        masterPeriodeDevidenId: data.masterPeriodeDevidenId,
        masterPencarianInvestorId: data.masterPencarianInvestorId,
        imageId: imageId,
      },
    });

    if (!updtNoImage) return { status: 400, message: "Gagal update data" };
    revalidatePath("/dev/investasi/detail/portofolio/");

    return { status: 200, message: "Berhasil update" };
  }
}
