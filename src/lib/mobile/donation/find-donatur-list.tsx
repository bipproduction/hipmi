import prisma from "@/lib/prisma";

export const funFindDonaturList = async (donasiId: string) => {
  const finDonatur = await prisma.donasi_Invoice.findMany({
    where: {
      donasiId: donasiId,
      DonasiMaster_StatusInvoice: {
        name: "Berhasil",
      },
    },
    select: {
      authorId: true,
    },
    distinct: ["authorId"], // Ambil hanya authorId unik dari DB
  });

  // Filter null safety (jika diperlukan)
  const recipientIds = finDonatur
    .map((e) => e.authorId)
    .filter((id): id is string => id !== null && id !== undefined);

  console.log("[FIND DONATUR UNIK]", recipientIds);

  return recipientIds;
};
