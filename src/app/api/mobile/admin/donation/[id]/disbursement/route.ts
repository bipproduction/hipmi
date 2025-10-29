import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export { POST, GET };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  try {
    const dataDonasi = await prisma.donasi.findUnique({
      where: {
        id: id,
      },
      select: {
        akumulasiPencairan: true,
        totalPencairan: true,
      },
    });

    if (!dataDonasi)
      return NextResponse.json(
        {
          success: false,
          message: "Pencarian Donasi Gagal",
          reason: "Pencarian Donasi Gagal",
        },
        { status: 400 }
      );

    const createPencairan = await prisma.donasi_PencairanDana.create({
      data: {
        donasiId: id,
        nominalCair: +data.nominalCair,
        deskripsi: data.deskripsi,
        title: data.title,
        imageId: data.imageId,
      },
    });

    if (!createPencairan)
      return NextResponse.json(
        {
          success: false,
          message: "Pencairan Dana Gagal",
          reason: "Pencairan Dana Gagal",
        },
        { status: 400 }
      );

    const hasilTotalPencairan =
      Number(dataDonasi.totalPencairan) + Number(data.nominalCair);
    // const hasilAkumulasiPencairan = Number(dataDonasi.akumulasiPencairan) + 1;

    const countPencairan = await prisma.donasi_PencairanDana.count({
      where: {
        donasiId: id,
      },
    });

    const updateDonasi = await prisma.donasi.update({
      where: {
        id: id,
      },
      data: {
        akumulasiPencairan: countPencairan,
        totalPencairan: hasilTotalPencairan,
      },
    });

    if (!updateDonasi)
      return NextResponse.json(
        {
          success: false,
          message: "Update Donasi Gagal",
          reason: "Update Donasi Gagal",
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Pencairan Dana Berhasil",
        // data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Pencairan Dana Gagal",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  console.log("[CATEGORY]", category);
  let fixData;
  try {

    if (category === "get-all") {
      fixData = await prisma.donasi_PencairanDana.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          donasiId: id,
        },
        select: {
          id: true,
          createdAt: true,
          nominalCair: true,
        },
      });
    } else if (category === "get-one") {
      fixData = await prisma.donasi_PencairanDana.findUnique({
        where: {
          id: id,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Category tidak ditemukan",
          reason: "Category tidak ditemukan",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data disbursement",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data disbursement",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
