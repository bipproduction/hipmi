import { sessionCreate } from "@/app/auth/_lib/session_create";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { data } = await req.json();

    const cekUsername = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    try {
      if (cekUsername)
        return NextResponse.json(
          { success: false, message: "Username sudah digunakan" },
          { status: 400 }
        );

      const createUser = await prisma.user.create({
        data: {
          username: data.username,
          nomor: data.nomor,
          active: true,
        },
      });

      const token = await sessionCreate({
        sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
        encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
        user: createUser as any,
      });

      return NextResponse.json(
        { success: true, message: "Berhasil Login", data: createUser },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
