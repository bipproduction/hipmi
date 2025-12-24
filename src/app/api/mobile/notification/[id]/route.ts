import { prisma } from "@/lib";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  
  let fixData;
  const fixCategory = _.upperCase(category || "");

  try {
    const data = await prisma.notifikasi.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        recipientId: id,
        kategoriApp: fixCategory,
      },
    });

    fixData = data;

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.notifikasi.update({
      where: {
        id: id,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
