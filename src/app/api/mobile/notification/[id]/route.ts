import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    let fixData;

    if (category === "count-as-unread") {
      const data = await prisma.notifikasi.findMany({
        where: {
          userId: id,
          isRead: false,
        },
      });

      fixData = data.length;
    } else if (category === "all") {
      const data = await prisma.notifikasi.findMany({
        where: {
          userId: id,
        },
      });

      fixData = data;
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid category",
      });
    }

    return NextResponse.json({
      success: true,
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
