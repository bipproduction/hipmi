"use server";

import { prisma } from "@/lib";

export async function investasi_funGetOneDocumentById({
  documentId,
}: {
  documentId: string;
}) {
  const data = await prisma.dokumenInvestasi.findFirst({
    where: {
      id: documentId,
    },
  });

  return data;
}
