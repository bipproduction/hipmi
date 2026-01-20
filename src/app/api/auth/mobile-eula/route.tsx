import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nomor } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        nomor: nomor,
      },
    });

    if (!user)
      return NextResponse.json({
        success: false,
        message: "User belum terdaftar",
        status: 404,
      });

    const updateTerms = await prisma.user.update({
      where: { nomor: nomor },
      data: {
        termsOfServiceAccepted: true,
        acceptedTermsAt: new Date(),
      },
    });

    if (!updateTerms) {
      return NextResponse.json({
        success: false,
        message: "Gagal setujui syarat dan ketentuan",
        status: 400,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Anda telah setujui syarat dan ketentuan",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi masalah saat setujui syarat dan ketentuan",
        reason: error as Error,
      },
      { status: 500 }
    );
  }
}
