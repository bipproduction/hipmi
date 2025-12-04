import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  let fixData;

  try {
    fixData = await prisma.donasiMaster_Kategori.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        active: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Master berhasil diambil",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      error: "Gagal mengambil data master",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { data } = await request.json();

    console.log("id", id);
    console.log("data", data);

    try {
        const updateData = await prisma.donasiMaster_Kategori.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                active: data.active,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Master berhasil diupdate",
            data: updateData,
        });
    } catch (error) {
        console.log("[ERROR]", error);
        return NextResponse.json({
            success: false,
            error: "Gagal mengupdate data master",
            reason: (error as Error).message,
        });
    }
    
}