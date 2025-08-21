"use server";

import prisma from "@/lib/prisma";
import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";

export default async function funEditProfile(data: MODEL_PROFILE_OLD) {
  // const cekEmail = await prisma.profile.findMany({
  //   where: {
  //     email: data.Profile.email
  //   }
  // })

  // if(cekEmail) return {status: 400, message: "Email sudah di gunakan"}

  const res = await prisma.profile.update({
    where: {
      id: data.Profile?.id,
    },
    data: {
      name: data.Profile?.name,
      email: data.Profile?.email,
      alamat: data.Profile?.alamat,
      jenisKelamin: data.Profile?.jenisKelamin,
    },
  });

  if (!res) return { status: 400, message: "Gagal update" };

  return {
    status: 200,
    message: "Berhasil update",
  };
}
