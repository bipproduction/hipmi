import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export { DELETE };
async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (request.method !== "DELETE") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    // Ambil parameter id dari URL
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Parameter 'id' diperlukan",
        },
        { status: 400 }
      );
    }

    // Hapus data OTP
    await prisma.kodeOtp.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menghapus data OTP",
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error deleting OTP:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat menghapus data OTP",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
