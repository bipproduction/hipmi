import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { sendNotificationMobileToOneUser } from "@/lib/mobile/notification/send-notification";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../../types/type-mobile-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";

export { GET, PUT };

async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.investasi_Invoice.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        investasiId: true,
        nominal: true,
        createdAt: true,
        Author: true,
        StatusInvoice: true,
        imageId: true,
        MasterBank: true,
        lembarTerbeli: true,
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

async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await req.json();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  console.log("[ID]", id);
  console.log("[DATA]", data);
  console.log("[CATEGORY]", category);

  let fixData;
  try {
    if (category === "deny") {
      const updt = await prisma.investasi_Invoice.update({
        where: {
          id: id,
        },
        data: {
          statusInvoiceId: "4",
        },
        select: {
          Investasi: {
            select: {
              title: true,
            },
          },
          authorId: true,
        },
      });

      // SEND NOTIFICAtION
      await sendNotificationMobileToOneUser({
        recipientId: updt?.authorId as string,
        senderId: data?.senderId || "",
        payload: {
          title: "Transaksi Tertolak" as NotificationMobileTitleType,
          body: `Maaf transaksi kamu telah ditolak ! ${updt?.Investasi?.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "INVESTASI",
          deepLink: routeUserMobile.investmentTransaction,
        },
      });

      fixData = updt;
    } else if (category === "accept") {
      const findInvestasi = await prisma.investasi.findFirst({
        where: {
          id: data.investasiId,
        },
        select: {
          id: true,
          title: true,
          authorId: true,
          totalLembar: true,
          sisaLembar: true,
          lembarTerbeli: true,
        },
      });

      // Hitung TOTAL SISA LEMBAR
      const investasi_sisaLembar = Number(findInvestasi?.sisaLembar);
      const invoice_lembarTerbeli = Number(data.lembarTerbeli);
      const resultSisaLembar = investasi_sisaLembar - invoice_lembarTerbeli;

      // TAMBAH LEMBAR TERBELI
      const investasi_lembarTerbeli = Number(findInvestasi?.lembarTerbeli);
      const resultLembarTerbeli =
        investasi_lembarTerbeli + invoice_lembarTerbeli;

      // Progress
      const investasi_totalLembar = Number(findInvestasi?.totalLembar);
      const progress = (resultLembarTerbeli / investasi_totalLembar) * 100;
      const resultProgres = Number(progress).toFixed(2);

      const updateInvoice = await prisma.investasi_Invoice.update({
        where: {
          id: id,
        },
        data: {
          statusInvoiceId: "1",
        },
        select: {
          authorId: true,
        },
      });

      if (!updateInvoice) {
        return NextResponse.json(
          {
            success: false,
            message: "Gagal Update Status",
            reason: "Update status failed",
          },
          { status: 500 }
        );
      }

      const updateInvestasi = await prisma.investasi.update({
        where: {
          id: data.investasiId,
        },
        data: {
          sisaLembar: resultSisaLembar.toString(),
          lembarTerbeli: resultLembarTerbeli.toString(),
          progress: resultProgres,
        },
        include: {
          MasterStatusInvestasi: true,
        },
      });

      if (!updateInvestasi) {
        return NextResponse.json(
          {
            success: false,
            message: "Gagal Update Data Investasi",
            reason: "Update data investasi failed",
          },
          { status: 500 }
        );
      }

      // SEND NOTIFICATION: to investor
      await sendNotificationMobileToOneUser({
        recipientId: updateInvoice?.authorId as string,
        senderId: data?.senderId || "",
        payload: {
          title: "Transaksi Berhasil" as NotificationMobileTitleType,
          body: `Selamat anda menjadi investor pada investasi ${findInvestasi?.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "INVESTASI",
          deepLink: routeUserMobile.investmentTransaction,
        },
      });

      // SEND NOTIFICATION: to creator
      await sendNotificationMobileToOneUser({
        recipientId: findInvestasi?.authorId as any,
        senderId: data?.senderId || "",
        payload: {
          title: "Ada Investor Baru !" as NotificationMobileTitleType,
          body: `Cek daftar investor pada ${findInvestasi?.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "INVESTASI",
          deepLink: routeUserMobile.investmentDetailPublish({
            id: findInvestasi?.id as string,
          }),
        },
      });

      fixData = updateInvoice;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category",
          reason: "Invalid category",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil update data",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error update detail Investasi",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
