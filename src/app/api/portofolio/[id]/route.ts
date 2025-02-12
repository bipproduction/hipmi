import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export { POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  if (request.method !== "POST") {
    return NextResponse.json(
      {
        success: false,
        message: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    const { id } = params;
    const { data } = await request.json();

    const createPortofolio = await prisma.portofolio.create({
      data: {
        profileId: id,
        id_Portofolio: "Porto" + Date.now().toString(),
        namaBisnis: data.namaBisnis,
        deskripsi: data.deskripsi,
        tlpn: data.tlpn,
        alamatKantor: data.alamatKantor,
        masterBidangBisnisId: data.masterBidangBisnisId,
        logoId: data.fileId,
      },
    });

    if (!createPortofolio)
      return NextResponse.json(
        {
          success: false,
          message: "Gagal membuat portofolio",
        },
        { status: 400 }
      );

    const createMedsos = await prisma.portofolio_MediaSosial.create({
      data: {
        portofolioId: createPortofolio.id,
        facebook: data?.facebook,
        instagram: data?.instagram,
        tiktok: data?.tiktok,
        twitter: data?.twitter,
        youtube: data?.youtube,
      },
    });

    if (!createMedsos)
      return NextResponse.json(
        {
          success: false,
          message: "Gagal menambahkan medsos",
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: createPortofolio,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "API Error Post Data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
