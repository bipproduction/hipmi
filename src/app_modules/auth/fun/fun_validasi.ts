"use server";

import prisma from "@/lib/prisma";
import { RouterHome } from "@/lib/router_hipmi/router_home";
import { sealData, unsealData } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function auth_funValidasi({
  nomor,
  HIPMI_PWD,
}: {
  nomor: string;
  HIPMI_PWD: string;
}) {
  const pswd = process.env.WIBU_PWD as string;


  const cekUser = await prisma.user.findUnique({
    where: {
      nomor: nomor,
    },
    select: {
      id: true,
      nomor: true,
      username: true,
      masterUserRoleId: true,
    },
  });

  if (cekUser === null)
    return { status: 400, message: "Nomor Belum Terdaftar", role: {} };

  const sealToken = await sealData(
    JSON.stringify({
      id: cekUser.id,
      username: cekUser.username,
    }),
    {
      password: pswd,
    }
  );

  cookies().set({
    name: "mySession",
    value: sealToken,
    maxAge: 60 * 60 * 24 * 30,
  });

  const cekSessionUser = await prisma.userSession.findFirst({
    where: {
      userId: cekUser.id,
    },
  });

  if (cekSessionUser !== null) {
    await prisma.userSession.delete({
      where: {
        userId: cekUser.id,
      },
    });
  }

  try {
    const createUserSession = await prisma.userSession.create({
      data: {
        token: sealToken,
        userId: cekUser.id,
      },
    });

    if (!createUserSession)
      return { status: 401, message: "Gagal Membuat User Session", role: {} };

    revalidatePath(RouterHome.main_home);
  } catch (error) {
    console.log(error);
  }

  return {
    status: 200,
    message: "Nomor Terverifikasi",
    role: cekUser.masterUserRoleId,
  };
}
