import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export { GET, PUT };
async function GET(request: Request, { params }: { params: { id: string } }) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    let fixData;
    const { id } = params;

    fixData = await prisma.profile.findFirst({
      where: {
        id: id,
      },
      include: {
        User: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get profile",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get profile", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get profile",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request) {
  if (request.method !== "PUT") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const body = await request.json();
    const { data } = body;

    const cekEmail = await prisma.profile.findUnique({
      where: {
        email: data.email,
      },
    });

    if (cekEmail && cekEmail.id != data.id)
      return NextResponse.json(
        { success: false, message: "Email sudah digunakan" },
        { status: 400 }
      );

    const updateData = await prisma.profile.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        alamat: data.alamat,
        jenisKelamin: data.jenisKelamin,
      },
    });

    if (!updateData) {
      return NextResponse.json(
        { success: false, message: "Gagal update" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { success: true, message: "Berhasil edit profile" },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error edit profile", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error edit profile",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
