"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function auth_Logout() {
  const userId = await funGetUserIdByToken();

  try {
    const delToken = await prisma.userSession.delete({
      where: {
        userId: userId as string,
      },
    });

    if (!delToken) return { status: 400, message: "Gagal Hapus User Session" };

    cookies().delete({
      name: "mySession",
    });
    return { status: 200, message: "Logout Berhasil" };
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
  return { status: 200, message: "Anda  Berhasil Logout" };
}
