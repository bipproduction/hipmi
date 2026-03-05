import { decrypt } from "@/app/(auth)/_lib/decrypt";
import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    const dataUser = await decrypt({
      token: token!,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
    });

    const id = dataUser?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
