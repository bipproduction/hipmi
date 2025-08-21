"use server";

import prisma from "@/lib/prisma";

export async function AdminDonasi_funUpdateProgresDanTerkumpul(
  donasiId: string,
  terkumpul: number
) {
  const danaTerkumpul = terkumpul.toString();

  const update = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      terkumpul: danaTerkumpul,
    },
  });

  if (!update) return { status: 400, message: "Update dana terkumpul gagal" };
  let target: number = +update.target;
  let totalTerkumpul = Number(update.terkumpul);
  let progresSementarsa = Number(update.progres);

  const progress = (totalTerkumpul / target) * 100;
  const totalProgres = progresSementarsa + progress;

  const updateProgres = await prisma.donasi.update({
    where: { id: donasiId },
    data: { progres: totalProgres.toString() },
  });

  if (!updateProgres) return { status: 400, message: "Update progres gagal" };
  return {
    status: 200,
    message: "Berhasil update data donasi",
  };
}
