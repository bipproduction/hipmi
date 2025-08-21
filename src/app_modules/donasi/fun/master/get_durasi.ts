"use server";

import prisma from "@/lib/prisma";

export async function Donasi_getMasterDurasi() {
  const data = await prisma.donasiMaster_Durasi.findMany({});
  return data;
}
