"use server";

import prisma from "@/lib/prisma";
import { MODEL_PROFILE } from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Profile_funEditById(data: MODEL_PROFILE) {
  // console.log(data);

  const cekEmail = await prisma.profile.findUnique({
    where: {
      email: data.email,
    },
  });

  if (cekEmail && cekEmail.id != data.id)
    return { status: 400, message: "Email sudah digunakan" };

  const updt = await prisma.profile.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      email: data.email,
      alamat: data.alamat,
      jenisKelamin: data.jenisKelamin,
    },
  });

  if(!updt) return {status: 400, message: "Gagal update"}
  revalidatePath("/dev/katalog")
  return {
    status: 200,
     message: "Berhasil update"
  }
}
