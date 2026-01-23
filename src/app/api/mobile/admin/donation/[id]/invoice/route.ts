import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import _ from "lodash";
import { sendNotificationMobileToOneUser } from "@/lib/mobile/notification/send-notification";
import { NotificationMobileBodyType, NotificationMobileTitleType } from "../../../../../../../../types/type-mobile-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";

export { GET, PUT };

async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("[ID]", id);

  try {
    const data = await prisma.donasi_Invoice.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        donasiId: true,
        nominal: true,
        createdAt: true,
        Author: true,
        DonasiMaster_StatusInvoice: true,
        imageId: true,
        MasterBank: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
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

// TYPE DATA
interface DataType {
  donationId: string;
  nominal: number;
  senderId: string;
}

async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await req.json();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status as string);

  console.log("[ID]", id);
  console.log("[DATA]", data);
  console.log("[FIX STATUS]", fixStatus);

  const cloneData = data as DataType;

  try {
    const checkStatusTransaksi =
      await prisma.donasiMaster_StatusInvoice.findFirst({
        where: {
          name: fixStatus,
        },
      });

    if (!checkStatusTransaksi)
      return NextResponse.json(
        {
          success: false,
          message: "Failed update status invoice",
          reason: "Status not found",
        },
        { status: 500 }
      );

    const donasi = await prisma.donasi.findUnique({
      where: {
        id: data?.donationId,
      },
      select: {
        target: true,
        terkumpul: true,
      },
    });

    if (!donasi) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed update status invoice",
          reason: "Donasi not found",
        },
        { status: 500 }
      );
    }

    const updateInvoice = await prisma.donasi_Invoice.update({
      where: {
        id: id,
      },
      data: {
        donasiMaster_StatusInvoiceId: checkStatusTransaksi.id,
      },
      select: {
        authorId: true,
      },
    });

    if (!updateInvoice) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed update status invoice",
          reason: "Update invoice failed",
        },
        { status: 500 }
      );
    }

    let totalNominal =
      Number(cloneData.nominal) + (Number(donasi.terkumpul) || 0);
    const progres =
      Math.floor((totalNominal / Number(donasi.target)) * 1000) / 10;

    console.log("[STATUS]", checkStatusTransaksi);
    console.log("[TOTAL NOMINAL]", totalNominal);
    console.log("[PROGRES]", progres);

    const updateDonasi = await prisma.donasi.update({
      where: {
        id: data?.donationId,
      },
      data: {
        terkumpul: "" + totalNominal,
        progres: "" + progres,
      },
    });

    if (!updateDonasi) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed update status invoice",
          reason: "Update donasi failed",
        },
        { status: 500 }
      );
    }

      // SEND NOTIFICATION: to donatur
          await sendNotificationMobileToOneUser({
            recipientId: updateInvoice?.authorId as string,
            senderId: data?.senderId || "",
            payload: {
              title: "Transaksi Berhasil" as NotificationMobileTitleType,
              body: `Selamat anda menjadi donatur pada ${updateDonasi?.title}` as NotificationMobileBodyType,
              type: "announcement",
              kategoriApp: "DONASI",
              deepLink: routeUserMobile.donationTransaction,
            },
          });
    
          // SEND NOTIFICATION: to creator
          await sendNotificationMobileToOneUser({
            recipientId: updateDonasi?.authorId as any,
            senderId: data?.senderId || "",
            payload: {
              title: "Ada Donatur Baru !" as NotificationMobileTitleType,
              body: `Cek daftar donatur pada ${updateDonasi?.title}` as NotificationMobileBodyType,
              type: "announcement",
              kategoriApp: "DONASI",
              deepLink: routeUserMobile.donationDetailPublish({
                id: updateDonasi?.id as string,
              }),
            },
          });



    

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil update status invoice",
        data: updateDonasi,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error update status invoice",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
