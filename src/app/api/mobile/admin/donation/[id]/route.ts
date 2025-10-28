import prisma from "@/lib/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const donasiId = id;
    const data = await prisma.donasi.findUnique({
      where: {
        id: donasiId,
      },
      select: {
        id: true,
        title: true,
        target: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        publishTime: true,
        catatan: true,
        progres: true,
        terkumpul: true,
        authorId: true,
        namaBank: true,
        rekening: true,
        totalPencairan: true,
        akumulasiPencairan: true,
        imagesId: true,
        donasiMaster_KategoriId: true,
        donasiMaster_DurasiId: true,
        donasiMaster_StatusDonasiId: true,
        Author: true,
        imageDonasi: true,
        CeritaDonasi: true,
        DonasiMaster_Ketegori: true,
        DonasiMaster_Durasi: true,
        DonasiMaster_Status: true,
        imageId: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data Donasi Berhasil Diambil",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail Investasi",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status as string);

  console.log("[PUT ID]", id);
  console.log("[PUT DATA DONASI]", data);
  console.log("[PUT DATA DONASI]", fixStatus);

  let fixData;
  try {
    const checkStatus = await prisma.donasiMaster_StatusDonasi.findFirst({
      where: {
        name: fixStatus,
      },
    });

    console.log("[PUT CHECK STATUS]", checkStatus);

    if (!checkStatus)
      return NextResponse.json(
        {
          success: false,
          message: "Error update data event",
          reason: "Status not found",
        },
        { status: 500 }
      );

    if (fixStatus === "Reject") {
      const updateData = await prisma.donasi.update({
        where: {
          id: id,
        },
        data: {
          catatan: data,
          donasiMaster_StatusDonasiId: checkStatus.id,
        },
      });

      fixData = updateData;
    } else if (fixStatus === "Publish") {
      const updateData = await prisma.donasi.update({
        where: {
          id: id,
        },
        data: {
          donasiMaster_StatusDonasiId: checkStatus.id,
          publishTime: new Date(),
        },
      });

      fixData = updateData;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Data Donasi Berhasil Diambil",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail Investasi",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
