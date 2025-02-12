"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

interface Model_Invoice_Masuk {
  total: number;
  jumlah: number;
  pilihBank: string;
  investasiId: string;
}
export async function investasi_funCreateInvoice({
  data,
}: {
  data: Model_Invoice_Masuk;
}) {
  const userLoginId = await funGetUserIdByToken();

  const create = await prisma.investasi_Invoice.create({
    data: {
      nominal: "" + data.total,
      lembarTerbeli: "" + data.jumlah,
      masterBankId: data.pilihBank,
      authorId: userLoginId,
      investasiId: data.investasiId,
      statusInvoiceId: "3",
    },
  });

  if (!create) return { status: 400, message: "Gagal membuat invoice" };
  return { status: 201, data: create, message: "Berhasil membuat invoice" };
}
