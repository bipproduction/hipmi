import { NextResponse } from "next/server";

export { POST };

async function POST(request: Request) {
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  console.log("[DATA]", data);
  console.log("[CATEGORY]", category);

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
          target: data.target,
          title: data.title,
          donasiMaster_DurasiId: data.donasiMaster_DurasiId,
          donasiMaster_KategoriId: data.donasiMaster_KategoriId,
          authorId: data.authorId,
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

      if (!dataDonasi) return { status: 400, message: "Gagal disimpan" };
      const del = await prisma.donasi_TemporaryCreate.delete({
        where: {
          id: data.id,
        },
      });

      const dataCerita = await prisma.donasi_Cerita.create({
        data: {
          donasiId: dataDonasi.id,
          pembukaan: data.CeritaDonasi.pembukaan,
          cerita: data.CeritaDonasi.cerita,
          imageId: data.imageCeritaId,
        },
      });

      if (!dataCerita) return { status: 400, message: "Gagal disimpan" };
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
      error: "Gagal menambah donasi",
      reason: (error as Error).message,
    });
  }
}
