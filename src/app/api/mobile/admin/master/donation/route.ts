import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, POST };

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  //   const category = searchParams.get("category");
  let fixData;

  try {
    fixData = await prisma.donasiMaster_Kategori.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    // if (category === "category") {
    //   fixData = await prisma.donasiMaster_Kategori.findMany({
    //     orderBy: {
    //       createdAt: "asc",
    //     },
    //     where: {
    //       active: true,
    //     },
    //   });
    // } else if (category === "duration") {
    //   fixData = await prisma.donasiMaster_Durasi.findMany({
    //     orderBy: {
    //       createdAt: "asc",
    //     },
    //     where: {
    //       active: true,
    //     },
    //   });
    // } else {
    //   const category = await prisma.donasiMaster_Kategori.findMany({
    //     orderBy: {
    //       createdAt: "asc",
    //     },
    //     where: {
    //       active: true,
    //     },
    //   });

    //   const duration = await prisma.donasiMaster_Durasi.findMany({
    //     orderBy: {
    //       createdAt: "asc",
    //     },
    //     where: {
    //       active: true,
    //     },
    //   });

    //   fixData = {
    //     category: category,
    //     duration: duration,
    //   };
    // }

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

async function POST(request: Request) {
  const { data } = await request.json();

  console.log("data", data);

  try {
    const count = await prisma.donasiMaster_Kategori.count();
    const createNewId = count + 1;

    const createData = await prisma.donasiMaster_Kategori.create({
      data: {
        id: createNewId.toString(),
        name: data.name,
        active: data.active,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Master berhasil ditambahkan",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      error: "Gagal menambah data master",
      reason: (error as Error).message,
    });
  }
}
