import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export { DELETE, GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.investasi.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          include: {
            Profile: true,
          },
        },
        Investasi_Invoice: true,
        MasterStatusInvestasi: true,
        BeritaInvestasi: true,
        DokumenInvestasi: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
        MasterProgresInvestasi: true,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Mendapatkan Data",
      reason: (error as Error).message,
    });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const checkData = await prisma.investasi.findUnique({
      where: {
        id: id,
      },
      select: {
        imageId: true,
        prospektusFileId: true,
        DokumenInvestasi: true,
      },
    });

    if (!checkData) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    const listDocument = checkData.DokumenInvestasi;

    for (let i of listDocument) {
      const deleteFile = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${i.fileId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`,
          },
        }
      );

      if (!deleteFile.ok) {
        console.log("[DELETE FILE]", deleteFile);
      }

      const delDocument = await prisma.dokumenInvestasi.delete({
        where: {
          id: i.id,
        },
      });

      console.log("[DELETE DOCUMENT]", delDocument);
    }

    const delImage = await fetch(
      `https://wibu-storage.wibudev.com/api/files/${checkData.imageId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      }
    );

    const delProspektus = await fetch(
      `https://wibu-storage.wibudev.com/api/files/${checkData.prospektusFileId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      }
    );

    const data = await prisma.investasi.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Menghapus Data",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Menghapus Data",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    let fixData;
    const { id } = params;
    const { data } = await request.json();
    console.log("[PUT INVESTASI]", id, data);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    console.log("[Category]", category);

    if (category === "data") {
      const updateData = await prisma.investasi.update({
        where: {
          id: id,
        },
        data: {
          authorId: data.authorId,
          title: data.title,
          targetDana: data.targetDana,
          hargaLembar: data.hargaLembar,
          totalLembar: data.totalLembar,
          roi: data.roi,
          masterPencarianInvestorId: data.masterPencarianInvestorId,
          masterPeriodeDevidenId: data.masterPeriodeDevidenId,
          masterPembagianDevidenId: data.masterPembagianDevidenId,
          imageId: data.imageId,
        },
      });

      // console.log("[UPDATE INVESTASI]", updateData);

      fixData = updateData;
    } else if (category === "prospectus") {
      const updateData = await prisma.investasi.update({
        where: {
          id: id,
        },
        data: {
          prospektusFileId: data,
        },
      });

      // console.log("[UPDATE PROSPEKTUS]", updateData);

      fixData = updateData;
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Mengupdate Data",
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Mengupdate Data",
      reason: (error as Error).message,
    });
  }
}
