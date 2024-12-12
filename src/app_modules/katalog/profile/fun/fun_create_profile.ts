"use server";

import prisma from "@/app/lib/prisma";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funCreateNewProfile({
  data,
  imageId,
  imageBackgroundId,
}: {
  data: Prisma.ProfileCreateInput;
  imageId: string;
  imageBackgroundId: string;
}) {
  try {
    const userLoginId = await funGetUserIdByToken();

    if (!userLoginId) {
      return { status: 400, message: "User tidak terautentikasi" }; // Validasi user login
    }

    const findEmail = await prisma.profile.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findEmail) {
      return { status: 400, message: "Email telah digunakan" };
    }

    const createProfile = await prisma.profile.create({
      data: {
        userId: userLoginId,
        name: data.name,
        email: data.email,
        alamat: data.alamat,
        jenisKelamin: data.jenisKelamin,
        imageId: imageId,
        imageBackgroundId: imageBackgroundId,
      },
    });

    if (!createProfile) {
      return { status: 400, message: "Gagal membuat profile" };
    }

    // Revalidate cache halaman home
    try {
      revalidatePath(RouterHome.main_home);
    } catch (cacheError) {
      console.error("Cache revalidation failed:", cacheError);
      // Tidak membuat fungsi gagal, cukup log error cache
    }

    return {
      status: 201,
      message: "Berhasil",
    };
  } catch (error) {
    console.error("Error creating profile:", error);
    return { status: 500, message: "Terjadi kesalahan pada server" };
  }
}
