import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";

export { DELETE };
async function DELETE(request: Request) {
  if (request.method !== "DELETE") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    // Ambil parameter nomor dari URL
    const { nomor } = await request.json();

    // Validasi parameter nomor
    if (!nomor) {
      return NextResponse.json(
        {
          success: false,
          message: "Parameter 'nomor' diperlukan",
        },
        { status: 400 }
      );
    }

    // Cek apakah data OTP dengan nomor tersebut ada
    const existingOtp = await prisma.kodeOtp.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: { nomor },
    });

    if (!existingOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Data OTP tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // Hapus data OTP
    await prisma.kodeOtp.deleteMany({
      where: { nomor },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menghapus data OTP",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting OTP:", error);
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
