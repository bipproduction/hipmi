import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export { GET, POST, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const data = await prisma.portofolio.findUnique({
      where: {
        id: id,
      },
      include: {
        Portofolio_BidangDanSubBidangBisnis: {
          select: {
            id: true,
            MasterSubBidangBisnis: {
              select: {
                id: true,
                name: true,
                masterBidangBisnisId: true,
              },
            },
          },
        },
        MasterBidangBisnis: {
          select: {
            id: true,
            name: true,
            active: true,
          },
        },
        Portofolio_MediaSosial: true,
        Profile: {
          select: {
            userId: true,
            User: {
              select: {
                id: true,
              },
            },
          },
        },
        BusinessMaps: {
          include: {
            Author: true,
          },
        },
      },
    });

    if (!data)
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak ditemukan",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("API Error Get Data Portofolio", error);
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data Potofolio",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (request.method !== "PUT") {
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

    const checkData = await prisma.portofolio.findUnique({
      where: { id },
      include: {
        Portofolio_BidangDanSubBidangBisnis: true,
      },
    });

    if (!checkData) {
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // Update data utama portofolio
    const updatePortofolio = await prisma.portofolio.update({
      where: { id },
      data: {
        namaBisnis: data.namaBisnis,
        alamatKantor: data.alamatKantor,
        tlpn: data.tlpn,
        deskripsi: data.deskripsi,
        masterBidangBisnisId: data.masterBidangBisnisId,
      },
    });

    const bidangBerubah =
      checkData.masterBidangBisnisId !== data.masterBidangBisnisId;

    if (bidangBerubah) {
      // Bidang berubah → hapus semua sub bidang lama
      await prisma.portofolio_BidangDanSubBidangBisnis.deleteMany({
        where: { portofolioId: id },
      });

      // Tambahkan sub bidang baru
      for (const sub of data.subBidang) {
        await prisma.portofolio_BidangDanSubBidangBisnis.create({
          data: {
            portofolioId: id,
            masterBidangBisnisId: data.masterBidangBisnisId,
            masterSubBidangBisnisId: sub.MasterSubBidangBisnis.id,
          },
        });
      }
    } else {
      // Bidang tidak berubah → sinkronisasi sub bidang

      const existingSub = checkData.Portofolio_BidangDanSubBidangBisnis;

      const incomingIds = data.subBidang.map(
        (sub: any) => sub.MasterSubBidangBisnis.id
      );

      const existingIds = existingSub.map(
        (item) => item.masterSubBidangBisnisId
      );

      // 1. Hapus sub bidang yang sudah tidak dipilih
      const toDelete = existingSub.filter(
        (item) => !incomingIds.includes(item.masterSubBidangBisnisId)
      );

      await prisma.portofolio_BidangDanSubBidangBisnis.deleteMany({
        where: {
          id: {
            in: toDelete.map((item) => item.id),
          },
        },
      });

      // 2. Tambahkan sub bidang baru yang belum ada di DB
      const toCreate = data.subBidang.filter(
        (sub: any) => !existingIds.includes(sub.MasterSubBidangBisnis.id)
      );

      for (const sub of toCreate) {
        await prisma.portofolio_BidangDanSubBidangBisnis.create({
          data: {
            portofolioId: id,
            masterBidangBisnisId: data.masterBidangBisnisId,
            masterSubBidangBisnisId: sub.MasterSubBidangBisnis.id,
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil update data",
        data: updatePortofolio,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error update data portofolio", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error update data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}



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

    for (let i of data.subBidang) {
      const createSubBidang =
        await prisma.portofolio_BidangDanSubBidangBisnis.create({
          data: {
            portofolioId: createPortofolio.id,
            masterBidangBisnisId: data.masterBidangBisnisId,
            masterSubBidangBisnisId: i.id,
          },
        });

      if (!createSubBidang)
        return NextResponse.json(
          {
            success: false,
            message: "Gagal membuat sub bidang bisnis",
          },
          { status: 400 }
        );
    }

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
