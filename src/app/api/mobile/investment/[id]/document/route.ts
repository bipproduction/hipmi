import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";
import { routeAdminMobile, routeUserMobile } from "@/lib/mobile/route-page-mobile";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { POST, GET, DELETE };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  console.log("[POST DOCUMENT ID]", id);
  console.log("[POST DOCUMENT DATA]", data);

  try {
    const createdDocs = await prisma.dokumenInvestasi.upsert({
      where: {
        id: id,
      },
      create: {
        investasiId: id,
        title: data.title,
        fileId: data.fileId,
      },
      update: {
        title: data.title,
        fileId: data.fileId,
      },
      select: {
        investasiId: true,
        investasi: {
          select: {
            title: true,
            authorId: true,
          },
        },
      },
    });

    console.log("[CREATED DOCS]", createdDocs);

    const findInvestor = await prisma.investasi_Invoice.findMany({
      where: {
        investasiId: id,
        StatusInvoice: {
          name: "Berhasil",
        },
      },
      select: {
        authorId: true,
      },
    });

    console.log("[FIND INVESTOR]", findInvestor);

    // SEND NOTIFICATION
    await sendNotificationMobileToManyUser({
      recipientIds: findInvestor.map((e) => e.authorId!),
      senderId: createdDocs.investasi?.authorId as string,
      payload: {
        title: "Cek Dokumen" as NotificationMobileTitleType,
        body: `Ada dokumen terupdate pada ${createdDocs.investasi?.title}` as NotificationMobileBodyType,
        type: "announcement",
        kategoriApp: "INVESTASI",
        deepLink: routeUserMobile.investmentDetailPublish({
          id: createdDocs.investasiId as string,
        }),
      },
    });

    if (!createdDocs)
      return NextResponse.json({
        status: 201,
        success: true,
        message: "Berhasil Menambahkan Dokumen",
      });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil Menambahkan Dokumen",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Menambahkan Dokumen",
      reason: (error as Error).message,
    });
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page"));
  const takeData = PAGINATION_DEFAULT_TAKE
  const skipData =  page * takeData - takeData

  try {
    let fixData;

    if (category === "one-document") {
      fixData = await prisma.dokumenInvestasi.findUnique({
        where: {
          id: id,
        },
      });
    } else if (category == "all-document") {
      fixData = await prisma.dokumenInvestasi.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          investasiId: id,
          active: true,
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: fixData,
    });
  } catch (error) {
    console.error(error);
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
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const deleteData = await prisma.dokumenInvestasi.delete({
      where: {
        id: id,
      },
    });

    const deleteFile = await fetch(
      `https://wibu-storage.wibudev.com/api/files/${deleteData.fileId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      },
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Menghapus Dokumen",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Menghapus Dokumen",
      reason: (error as Error).message,
    });
  }
}
