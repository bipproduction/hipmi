import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (request.method === "GET") {
    try {
      let fixData;
      const { searchParams } = new URL(request.url);
      const except_id = searchParams.get("except-id");

      if (!except_id) {
        fixData = await prisma.user.findMany({
          where: {
            active: true,
          },
        });
      } else {
        fixData = await prisma.user.findMany({
          where: {
            active: true,
            masterUserRoleId: "1",
            id: {
              not: except_id,
            },
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Berhasil mendapatkan data",
        data: fixData,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Gagal mendapatkan data",
      });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Method not allowed",
    });
  }
}
