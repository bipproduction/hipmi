import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  try {
    // CODE HERE

    if (category === "category") {
      fixData = await prisma.donasiMaster_Kategori.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          active: true,
        },
      });
    } else if (category === "duration") {
      fixData = await prisma.donasiMaster_Durasi.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          active: true,
        },
      });
    } else {
      const category = await prisma.donasiMaster_Kategori.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          active: true,
        },
      });

      const duration = await prisma.donasiMaster_Durasi.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          active: true,
        },
      });

      fixData = {
        category: category,
        duration: duration,
      };
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Master berhasil diambil",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Gagal mengambil data master",
      reason: (error as Error).message,
    });
  }
}
