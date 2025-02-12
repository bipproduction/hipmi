"use server";

import prisma from "@/lib/prisma";
import { RouterHome } from "@/lib/router_hipmi/router_home";
import { sealData } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function Auth_funRegister({
  data,
  HIPMI_PWD,
}: {
  data: any;
  HIPMI_PWD: string;
}) {
  const pswd = process.env.WIBU_PWD as string;


  const cekUsername = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (cekUsername != null)
    return {
      status: 400,
      message: "Username sudah terdaftar",
    };

  const create = await prisma.user.create({
    data: {
      username: data.username,
      nomor: data.nomor,
    },
  });
  if (!create) return { status: 400, message: "Gagal Mendaftar" };

  const sealToken = await sealData(
    JSON.stringify({
      id: create.id,
      username: create.username,
    }),
    {
      password: pswd,
    }
  );

  cookies().set({
    name: "mySession",
    value: sealToken,
    maxAge: 60 * 60 * 24 * 7,
  });

  try {
    const createUserSession = await prisma.userSession.create({
      data: {
        token: sealToken,
        userId: create.id,
      },
    });

    if (!createUserSession)
      return { status: 401, message: "Gagal Membuat User Session" };

    revalidatePath(RouterHome.main_home);
  } catch (error) {
    console.log(error);
  }
  return { status: 200, message: "Berhasil Mendaftar" };
}
