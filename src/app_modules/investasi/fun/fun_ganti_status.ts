"use server";

import prisma from "@/lib/prisma";
import { RouterAdminInvestasi_OLD } from "@/lib/router_hipmi/router_admin";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import moment from "moment";
import { revalidatePath } from "next/cache";

export default async function funGantiStatusInvestasi(
  id: string,
  statusInves: string,
  statusProgres?: string
) {

  if (statusProgres === '1') {
    const publishCD = new Date();
    const data = await prisma.investasi.update({
      where: {
        id: id,
      },
      data: {
        MasterStatusInvestasi: {
          connect: {
            id: statusInves,
          },
        },
        countDown: publishCD,
        MasterProgresInvestasi: {
          connect: {
            id: statusProgres,
          },
        },
      },
    });

    if (!data) return { status: 400 };

    revalidatePath(RouterInvestasi_OLD.portofolio);
    revalidatePath(RouterAdminInvestasi_OLD.main_investasi);

    return {
      status: 200,
    };
  } else {
    const publishCD = new Date();
    const data = await prisma.investasi.update({
      where: {
        id: id,
      },
      data: {
        MasterStatusInvestasi: {
          connect: {
            id: statusInves,
          },
        },
        countDown: publishCD,
      },
    });

    if (!data) return { status: 400 };

    revalidatePath(RouterInvestasi_OLD.portofolio);
    revalidatePath(RouterAdminInvestasi_OLD.main_investasi);

    return {
      status: 200,
    };
  }
}
