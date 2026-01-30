import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export { GET, POST };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const page = parseInt(searchParams.get("page") || "1");
    const take = 10; // Default 10 data
    const skip = page * take - take;

    const data = await prisma.portofolio.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        profileId: id,
        active: true,
      },
    });

    // Hitung total data untuk informasi pagination
    const total = await prisma.portofolio.count({
      where: {
        profileId: id,
        active: true,
      },
    });

    const totalPages = Math.ceil(total / take);

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
        meta: {
          page,
          take,
          skip,
          total,
          totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data Potofolio",
        reason: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

async function POST(request: Request) {
  try {
    const { data } = await request.json();

    console.log("DATA >>", data);

    const createPortofolio = await prisma.portofolio.create({
      data: {
        profileId: data.id,
        id_Portofolio: "Porto" + Date.now().toString(),
        namaBisnis: data.namaBisnis,
        deskripsi: data.deskripsi,
        tlpn: data.tlpn,
        alamatKantor: data.alamatKantor,
        masterBidangBisnisId: data.masterBidangBisnisId,
        logoId: data.fileId || "",
      },
    });

    if (
      data.subBidang.length > 0 ||
      data.subBidang.map((item: any) => item.id !== "")
    ) {
      for (let i of data.subBidang) {
        const createSubBidang =
          await prisma.portofolio_BidangDanSubBidangBisnis.create({
            data: {
              portofolioId: createPortofolio.id,
              masterBidangBisnisId: data.masterBidangBisnisId,
              masterSubBidangBisnisId: i.id,
            },
          });

        console.log("CREATE SUB BIDANG >>", createSubBidang);
        if (!createSubBidang)
          return NextResponse.json(
            {
              success: false,
              message: "Gagal membuat sub bidang bisnis",
            },
            { status: 400 },
          );
      }
    }

    if (!createPortofolio)
      return NextResponse.json(
        {
          success: false,
          message: "Gagal membuat portofolio",
        },
        { status: 400 },
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
        { status: 400 },
      );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: createPortofolio,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "API Error Post Data",
        reason: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
