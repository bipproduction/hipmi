import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import moment from "moment";
import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import { NotificationMobileBodyType } from "../../../../../types/type-mobile-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { POST, GET };

async function POST(request: Request) {
  const { data } = await request.json();
  console.log(["DATA INVESTASI"], data);

  const fixTitle = _.startCase(data.title)

  try {
    const create = await prisma.investasi.create({
      data: {
        masterStatusInvestasiId: "2",
        authorId: data.authorId,
        title: fixTitle,
        targetDana: data.targetDana,
        hargaLembar: data.hargaLembar,
        totalLembar: data.totalLembar,
        sisaLembar: data.totalLembar,
        roi: data.roi,
        masterPencarianInvestorId: data.masterPencarianInvestorId,
        masterPembagianDevidenId: data.masterPembagianDevidenId,
        masterPeriodeDevidenId: data.masterPeriodeDevidenId,
        imageId: data.imageId,
        prospektusFileId: data.prospektusFileId,
      },
    });

    console.log("[CREATE INVESTASI]", create);

    const adminUsers = await prisma.user.findMany({
      where: { masterUserRoleId: "2", NOT: { id: data.authorId } },
      select: { id: true },
    });

    // SEND NOTIFICATION
    await sendNotificationMobileToManyUser({
      recipientIds: adminUsers.map((user) => user.id),
      senderId: data.authorId,
      payload: {
        title: "Pengajuan Review Baru",
        body: fixTitle as NotificationMobileBodyType,
        type: "announcement",
        deepLink: routeAdminMobile.investmentByStatus({ status: "review" }),
        kategoriApp: "INVESTASI",
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil Membuat Investasi",
    });
  } catch (error) {
    console.log("[ERROR CREATE INVESTASI]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Membuat Investasi ",
      reason: error || (error as Error).message,
    });
  }
}

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const authorId = searchParams.get("authorId");
  const page = Number(searchParams.get("page"));
  const takeData = PAGINATION_DEFAULT_TAKE
  const skipData = page ? page * takeData - takeData : 0;

  console.log("[CATEGORY]", category);
  console.log("[AUTHOR ID]", authorId);
  let fixData;
  try {
    if (category === "bursa") {
      const data = await prisma.investasi.findMany({
        where: {
          masterStatusInvestasiId: "1",
          masterProgresInvestasiId: "1",
        },
        select: {
          id: true,
          MasterPencarianInvestor: true,
          countDown: true,
          progress: true,
        },
      });

      for (let a of data) {
        if (
          (a.MasterPencarianInvestor?.name as any) -
            moment(new Date()).diff(new Date(a.countDown as any), "days") <=
          0
        ) {
          await prisma.investasi.update({
            where: {
              id: a.id,
            },
            data: {
              masterProgresInvestasiId: "3",
            },
          });
        }

        if (a.progress === "100") {
          await prisma.investasi.update({
            where: {
              id: a.id,
            },
            data: {
              masterProgresInvestasiId: "2",
            },
          });
        }
      }

      const dataAwal = await prisma.investasi.findMany({
        orderBy: [
          {
            masterProgresInvestasiId: "asc",
          },
          {
            countDown: "desc",
          },
        ],
        where: {
          masterStatusInvestasiId: "1",
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        select: {
          id: true,
          imageId: true,
          title: true,
          progress: true,
          countDown: true,
          MasterPencarianInvestor: {
            select: {
              name: true,
            },
          },
        },
      });

      fixData = dataAwal.map((v: any) => ({
        ..._.omit(v, ["MasterPencarianInvestor"]),
        pencarianInvestor: v.MasterPencarianInvestor.name,
      }));
    } else if (category === "my-holding") {
      const data = await prisma.investasi_Invoice.findMany({
        where: {
          authorId: authorId,
          statusInvoiceId: "1",
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        select: {
          id: true,
          investasiId: true,
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
    }
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR GET INVESTASI]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Mendapatkan Data",
      reason: error || (error as Error).message,
    });
  }
}
