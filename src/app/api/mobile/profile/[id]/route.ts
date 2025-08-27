import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export { GET, PUT };
async function GET(request: Request, { params }: { params: { id: string } }) {
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

async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (request.method !== "PUT") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    let message;
    const { id } = params;
    const body = await request.json();
    const { data } = body;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (category === "profile") {
      const cekEmail = await prisma.profile.findUnique({
        where: {
          email: data.email,
        },
      });
      if (cekEmail && cekEmail.id != id)
        return NextResponse.json({
          success: false,
          message: "Email sudah digunakan",
        });
      const updateData = await prisma.profile.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
          email: data.email,
          alamat: data.alamat,
          jenisKelamin: data.jenisKelamin,
        },
      });
      if (!updateData) {
        return NextResponse.json({ success: false, message: "Gagal update" });
      }

      message = "Berhasil edit profile";
    } else if (category === "photo") {
      const updateData = await prisma.profile.update({
        where: {
          id: id,
        },
        data: {
          imageId: data.fileId,
        },
      });

      if (!updateData) {
        return NextResponse.json({
          success: false,
          message: "Gagal update foto",
        });
      }

      message = "Berhasil edit foto profile";
    } else if (category === "background") {
      const updateData = await prisma.profile.update({
        where: {
          id: id,
        },
        data: {
          imageBackgroundId: data.fileId,
        },
      });
      if (!updateData) {
        return NextResponse.json({
          success: false,
          message: "Gagal update background",
        });
      }

      message = "Berhasil edit background profile";
    }

    return NextResponse.json({
      success: true,
      message: message,
    });
  } catch (error) {
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
