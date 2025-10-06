import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST };

async function POST(request: Request) {
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  
  try {
    // CODE HERE

    if (category === "temporary") {
      fixData = await prisma.donasi_TemporaryCreate.create({
        data: {
          title: data.title,
          target: data.target,
          donasiMaster_DurasiId: data.durasiId,
          donasiMaster_KategoriId: data.kategoriId,
          imageId: data.imageId,
        },
      });
    } else if (category === "permanent") {
      const dataDonasi = await prisma.donasi.create({
        data: {
          authorId: data.authorId,
          title: data.title,
          target: data.target,
          donasiMaster_DurasiId: data.donasiMaster_DurasiId,
          donasiMaster_KategoriId: data.donasiMaster_KategoriId,
          namaBank: data.namaBank,
          rekening: data.rekening,
          imageId: data.imageId,
        },
        select: {
          id: true,
          title: true,
          authorId: true,
          DonasiMaster_Status: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!dataDonasi)
        return NextResponse.json({
          status: 400,
          success: false,
          reason: "Gagal menambah donasi",
        });
      const del = await prisma.donasi_TemporaryCreate.delete({
        where: {
          id: data.temporaryId,
        },
      });

      const dataCerita = await prisma.donasi_Cerita.create({
        data: {
          donasiId: dataDonasi.id,
          pembukaan: data.pembukaan,
          cerita: data.cerita,
          imageId: data.imageCeritaId,
        },
      });

      if (!dataCerita)
        return NextResponse.json({
          status: 400,
          success: false,
          reason: "Gagal menambah cerita donasi",
        });
    }

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Donasi berhasil ditambahkan",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error menambah donasi",
      reason: (error as Error).message,
    });
  }
}
