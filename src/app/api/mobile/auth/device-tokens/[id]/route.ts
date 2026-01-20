import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";

export { DELETE };

async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get("deviceId");

  console.log("ID", id);
  console.log("DEVICE ID", deviceId);

  try {
    const findFirst = await prisma.tokenUserDevice.findFirst({
      where: {
        userId: id,
        deviceId: deviceId as any,
      },
    });

    if (!findFirst) {
      return NextResponse.json({
        success: false,
        message: "User tidak ditemukan !",
      });
    }

    const deleted = await prisma.tokenUserDevice.delete({
      where: {
        id: findFirst.id,
      },
    });

    console.log("DEL", deleted);

    return NextResponse.json({
      success: true,
      message: "Berhasil menghapus device token user",
    });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json(
      { error: (error as Error).message, message: "Terjadi error pada API" },
      { status: 500 }
    );
  }
}
