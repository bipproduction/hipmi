"use server";

import prisma from "@/lib/prisma";
import { MODEL_INVESTASI } from "../_lib/interface";
import { revalidatePath } from "next/cache";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";

export interface Model_Midtrans_Success {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  va_numbers: [{ bank: string; va_number: string }];
  pdf_url: string;
  finish_redirect_url: string;
}

interface Model_Body {
  authorId: string;
  customer_name: string;
  phone: string;
  gross_amount: number;
  item_name: string;
  price: number;
  quantity: number;
  merchant_name: string;
  investasiId: string;
}

interface Model_Token {
  token: string;
  redirect_url: string;
}

export default async function funUpdatePaymentInvestasi(
  data: Model_Midtrans_Success,
  body: Model_Body,
  token: Model_Token
) {
  if (data.status_code === "200") {
    const res = await prisma.transaksiInvestasi.create({
      data: {
        gross_amount: "" + body.gross_amount,
        merchant_name: body.merchant_name,
        price: "" + body.price,
        quantity: "" + body.quantity,
        token: token.token,
        redirect_url: token.redirect_url,
        authorId: body.authorId,
        investasiId: body.investasiId,
        status_code: data.status_code,
        status_message: data.status_message,
        order_id: data.order_id,
        fraud_status: data.fraud_status,
        payment_type: data.payment_type,
        transaction_id: data.transaction_id,
        transaction_status: data.transaction_status,
        transaction_time: data.transaction_time,
        pdf_url: data.pdf_url,
        finish_redirect_url: data.finish_redirect_url,
        namaBank: data.va_numbers[0].bank,
        nomorRekening: data.va_numbers[0].va_number,
      },
    });

    if (!res) return { status: 400, message: "Gagal update transaksi" };

    revalidatePath(RouterInvestasi_OLD.main_transaksi);

    return {
      status: 200,
      message: "Berhasil",
      data: res,
    };
  }
}
