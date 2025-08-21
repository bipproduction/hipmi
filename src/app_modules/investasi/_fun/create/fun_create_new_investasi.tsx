"use server";

import { prisma } from "@/lib";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { MODEL_INVESTASI } from "../../_lib/interface";

export async function investasi_funCreateNewInvestasi({
  data,
  fileImageId,
  filePdfId,
}: {
  data: MODEL_INVESTASI;
  fileImageId: string;
  filePdfId: string;
}) {
  const userLoginId = await funGetUserIdByToken();
  try {
    const createNew = await prisma.investasi.create({
      data: {
        authorId: userLoginId,
        title: _.startCase(data.title),
        targetDana: data.targetDana.toString(),
        hargaLembar: data.hargaLembar.toString(),
        totalLembar: data.totalLembar.toString(),
        sisaLembar: data.totalLembar.toString(),
        roi: data.roi.toString(),
        masterPembagianDevidenId: data.masterPembagianDevidenId,
        masterPeriodeDevidenId: data.masterPeriodeDevidenId,
        masterPencarianInvestorId: data.masterPencarianInvestorId,
        masterStatusInvestasiId: "2",
        imageId: fileImageId,
        prospektusFileId: filePdfId,
      },
      select: {
        id: true,
        title: true,
        authorId: true,
        MasterStatusInvestasi: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!createNew) return { status: 400, message: "Gagal Membuat Investasi" };
    revalidatePath(NEW_RouterInvestasi.portofolio({id: "2"}));

    return {
      status: 201,
      data: createNew,
      message: "Berhasil Membuat Investasi",
    };
  } catch (error) {
    console.log(error);

    return { status: 400, message: "Error Message" };
  }
}
