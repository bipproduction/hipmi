import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const data = await prisma.investasi.findUnique({
      where: {
        id: id,
      },
      select: {
        imageId: true,
        prospektusFileId: true,
        id: true,
        author: {
          select: {
            id: true,
            username: true,
            nomor: true,
            Profile: true,
          },
        },
        title: true,
        authorId: true,
        hargaLembar: true,
        targetDana: true,
        totalLembar: true,
        sisaLembar: true,
        lembarTerbeli: true,
        progress: true,
        roi: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        catatan: true,
        imagesId: true,
        MasterStatusInvestasi: true,
        BeritaInvestasi: true,
        DokumenInvestasi: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
        MasterProgresInvestasi: true,
        masterStatusInvestasiId: true,
        countDown: true,
        Investasi_Invoice: {
          where: {
            statusInvoiceId: "2",
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get data investment",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data investment",
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

  console.log("[=======Start Investment console=======]");
  console.log("[ID]", id);
  console.log("[DATA]", data);
  console.log("[STATUS]", status);
  console.log("[=======End Investment console=======]");

  const publishTime = new Date();

  try {
    if (status === "reject") {
      const updatedData = await prisma.investasi.update({
        where: {
          id: id,
        },
        data: {
          catatan: data,
          masterStatusInvestasiId: "4",
        },
      });

      console.log("[UPDATE REJECT]", updatedData);
    } else if (status === "publish") {
      const updatedData = await prisma.investasi.update({
        where: {
          id: id,
        },
        data: {
          masterStatusInvestasiId: "1",
          masterProgresInvestasiId: "1",
          countDown: publishTime,
        },
      });

      console.log("[UPDATE PUBLISH]", updatedData);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success update data investment",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error update data investment",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
