"use server";

import prisma from "@/lib/prisma";

export async function Donasi_funUploadBuktiTransferById({
  invoiceId,
  fileId,
}: {
  invoiceId: string;
  fileId: string;
}) {
  const updateFile = await prisma.donasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      imageId: fileId,
    },
  });

  if (!updateFile) return { status: 400, message: "Gagal update gambar" };
  return {
    status: 200,
    message: "Berhasil upload",
  };
}
