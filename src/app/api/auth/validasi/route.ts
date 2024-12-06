import { sessionCreate } from "@/app/auth/_lib/session_create";
import prisma from "@/app/lib/prisma";
import { ServerEnv } from "@/app/lib/server_env";
import { sealData } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { nomor } = await req.json();

    const dataUser = await prisma.user.findUnique({
      where: {
        nomor: nomor,
      },
      select: {
        id: true,
        nomor: true,
        username: true,
        active: true,
        masterUserRoleId: true,
      },
    });


    if (dataUser === null)
      return new Response(
        JSON.stringify({ success: false, message: "Nomor Belum Terdaftar" }),
        { status: 404 }
      );

    const token = await sessionCreate({
      sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
      user: dataUser as any,
    });

    const cekSessionUser = await prisma.userSession.findFirst({
      where: {
        userId: dataUser.id,
      },
    });

    if (cekSessionUser !== null) {
      await prisma.userSession.delete({
        where: {
          userId: dataUser.id,
        },
      });
    }

    try {
      const createUserSession = await prisma.userSession.create({
        data: {
          token: token as string,
          userId: dataUser.id,
        },
      });

      if (!createUserSession)
        return new Response(
          JSON.stringify({ success: false, message: "Gagal Membuat Session" }),
          { status: 400 }
        );
    } catch (error) {
      console.log(error);
    }

    // if (data) {
    //   const res = await sealData(
    //     JSON.stringify({
    //       id: data.id,
    //       username: data.username,
    //     }),
    //     {
    //       password: ServerEnv.value?.WIBU_PWD as string,
    //     }
    //   );

    //   cookies().set({
    //     name: "mySession",
    //     value: res,
    //     maxAge: 60 * 60 * 24 * 7,
    //   });

    //   revalidatePath("/dev/home");

    //   return NextResponse.json({ status: 200, data });
    // }

    // return NextResponse.json({ success: true });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Berhasil Login",
        roleId: dataUser.masterUserRoleId,
        active: dataUser.active,
      }),
      { status: 200 }
    );
  }
  return new Response(
    JSON.stringify({ success: false, message: "Method Not Allowed" }),
    { status: 405 }
  );
}
