"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";

export async function investasi_funUploadBuktiTransferById({
  invoiceId,
  fileId,
}: {
  invoiceId: string;
  fileId: string;
}) {
  const updateFile = await prisma.investasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      imageId: fileId,
      statusInvoiceId: "2",
    },
  });

  if (!updateFile) return { status: 400, message: "Gagal update gambar" };
  return {
    status: 200,
    message: "Berhasil upload",
  };
}
