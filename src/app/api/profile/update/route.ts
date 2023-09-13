import prisma from "@/app/lib/prisma";
import { MyConsole } from "@/app_modules/fun";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();

    const data = await prisma.profile.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        email: body.email,
        alamat: body.alamat,
        jenisKelamin: body.jenisKelamin,
        User: {
          update: {
            username: body.username,
            nomor: body.nomor,
          },
        },
      },
    });
    if (data) return NextResponse.json({ status: 200 });

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
