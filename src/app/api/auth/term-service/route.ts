import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    console.log("data >>", data);

    const updateTermService = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        termsOfServiceAccepted: data.termsOfServiceAccepted,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil",
    });
  } catch (error) {
    console.log("error >>", error);
    return NextResponse.json({
      success: false,
      message: "Gagal",
    });
  }
}
