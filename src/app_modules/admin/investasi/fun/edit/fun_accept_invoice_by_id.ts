"use server";

import prisma from "@/lib/prisma";
import { RouterAdminInvestasi } from "@/lib/router_admin/router_admin_investasi";
import { toNumber } from "lodash";
import { revalidatePath } from "next/cache";

export async function adminInvestasi_funAcceptTransaksiById({
  invoiceId,
  investasiId,
  lembarTerbeli,
}: {
  invoiceId: string;
  investasiId: string;
  lembarTerbeli: string;
}) {
  const dataInvestasi: any = await prisma.investasi.findFirst({
    where: {
      id: investasiId,
    },
    select: {
      totalLembar: true,
      sisaLembar: true,
      lembarTerbeli: true,
    },
  });

  // Hitung TOTAL SISA LEMBAR
  const investasi_sisaLembar = toNumber(dataInvestasi?.sisaLembar);
  const invoice_lembarTerbeli = toNumber(lembarTerbeli);
  const resultSisaLembar = investasi_sisaLembar - invoice_lembarTerbeli;

  // TAMBAH LEMBAR TERBELI
  const investasi_lembarTerbeli = toNumber(dataInvestasi?.lembarTerbeli);
  const resultLembarTerbeli = investasi_lembarTerbeli + invoice_lembarTerbeli;

  // Progress
  const investasi_totalLembar = toNumber(dataInvestasi?.totalLembar);
  const progress = (resultLembarTerbeli / investasi_totalLembar) * 100;
  const resultProgres = toNumber(progress).toFixed(2);

  const updt = await prisma.investasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      statusInvoiceId: "1",
    },
  });

  if (!updt) {
    return { status: 400, message: "Gagal Update Status" };
  } else {
    const updateInvestasi = await prisma.investasi.update({
      where: {
        id: investasiId,
      },
      data: {
        sisaLembar: resultSisaLembar.toString(),
        lembarTerbeli: resultLembarTerbeli.toString(),
        progress: resultProgres,
      },
      include: {
        MasterStatusInvestasi: true,
      },
    });

    if (!updateInvestasi)
      return { status: 400, message: "Gagal Update Data Investasi" };

    const newData = updateInvestasi;

    const allData = {
      dataInvestasi: updateInvestasi,
      dataInvestor: updt,
    };

    revalidatePath(RouterAdminInvestasi.detail_publish);
    return {
      status: 200,
      message: "Update Berhasil",
      data: allData,
    };
  }
}
