import { prisma } from "@/lib";
import _ from "lodash";
import { NextResponse } from "next/server";

export { POST, GET, PUT };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  try {
    console.log("[ID INVOICE]", id);
    console.log("[DATA INVOICE]", data);

    const create = await prisma.investasi_Invoice.create({
      data: {
        investasiId: id,
        authorId: data.authorId,
        nominal: "" + data.total,
        lembarTerbeli: "" + data.jumlah,
        masterBankId: data.bankId,
        statusInvoiceId: "3",
      },
    });

    console.log("[CREATE INVOICE]", create);

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil membuat invoice",
      data: create,
    });
  } catch (error) {
    console.error("[ERROR CREATE INVOICE]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal membuat invoice",
      reason: (error as Error).message,
    });
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // << AUTHOR ID
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const authorId = searchParams.get("authorId");

  console.log("[ID INVOICE]", id);
  

  let fixData;

  try {
    if (category === "invoice") {
      const data = await prisma.investasi_Invoice.findFirst({
        where: {
          id: id,
        },
        include: {
          MasterBank: true,
          StatusInvoice: true,
          Investasi: {
            include: {
              MasterPembagianDeviden: true,
              MasterPencarianInvestor: true,
              MasterPeriodeDeviden: true,
              ProspektusInvestasi: true,
              Investasi_Invoice: {
                where: {
                  statusInvoiceId: "1",
                },
              },
            },
          },
          Author: {
            include: {
              Profile: true,
            },
          },
        },
      });

      console.log("[DATA INVOICE]", data ? true : false);

      const { ...allData } = data;
      const Investor = data?.Investasi?.Investasi_Invoice;
      fixData = { ...allData, Investor };
    } else if (category == "my-invest") {
      const data = await prisma.investasi_Invoice.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          authorId: authorId,
          statusInvoiceId: "1",
          isActive: true,
        },
        select: {
          id: true,
          nominal: true,
          lembarTerbeli: true,
          Investasi: {
            select: {
              title: true,
              progress: true,
            },
          },
        },
      });

      fixData = data.map((v: any) => ({
        ..._.omit(v, ["Investasi"]),
        title: v.Investasi.title,
        progress: v.Investasi.progress,
      }));
    } else if (category == "transaction") {
      const data = await prisma.investasi_Invoice.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          authorId: authorId,
        },
        select: {
          id: true,
          statusInvoiceId: true,
          nominal: true,
          createdAt: true,
          StatusInvoice: {
            select: {
              name: true,
            },
          },
          Investasi: {
            select: {
              title: true,
            },
          },
        },
      });

      fixData = data.map((v: any) => ({
        ..._.omit(v, ["Investasi", "StatusInvoice"]),
        title: v.Investasi.title,
        statusInvoice: v.StatusInvoice.name,
      }));
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: `Berhasil mendapatkan data ${category}`,
      data: fixData,
    });
  } catch (error) {
    console.error(`Error get ${category}`, error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: `Gagal mendapatkan data ${category}`,
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status || "");

  console.log("[FIX STATUS]", fixStatus);
  console.log("[DATA]", data);
  console.log("[ID]", id);

  try {
    const checkStatus = await prisma.investasiMaster_StatusInvoice.findFirst({
      where: {
        name: fixStatus,
      },
    });

    console.log("[CHECK STATUS]", checkStatus);

    if (!checkStatus) {
      throw new Error("Status invoice tidak ditemukan");
    }

    const update = await prisma.investasi_Invoice.update({
      where: {
        id: id,
      },
      data: {
        statusInvoiceId: checkStatus.id,
        imageId: data.imageId,
      },
    });

    console.log("[UPDATE]", update);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mengubah status invoice",
      // data: update,
    });
  } catch (error) {
    console.error("Error update invoice", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mengubah status invoice",
      reason: (error as Error).message,
    });
  }
}
