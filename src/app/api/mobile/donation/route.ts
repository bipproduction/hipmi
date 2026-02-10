import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import prisma from "@/lib/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";
import { NotificationMobileBodyType } from "../../../../../types/type-mobile-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { POST, GET };

async function POST(request: Request) {
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  try {
    // CODE HERE

    if (category === "temporary") {
      fixData = await prisma.donasi_TemporaryCreate.create({
        data: {
          title: data.title,
          target: data.target,
          donasiMaster_DurasiId: data.durasiId,
          donasiMaster_KategoriId: data.kategoriId,
          imageId: data.imageId,
        },
      });
    } else if (category === "permanent") {
      const dataDonasi = await prisma.donasi.create({
        data: {
          authorId: data.authorId,
          title: data.title,
          target: data.target,
          donasiMaster_DurasiId: data.donasiMaster_DurasiId,
          donasiMaster_KategoriId: data.donasiMaster_KategoriId,
          namaBank: data.namaBank,
          rekening: data.rekening,
          imageId: data.imageId,
        },
        select: {
          id: true,
          title: true,
          authorId: true,
          DonasiMaster_Status: {
            select: {
              name: true,
            },
          },
        },
      });

      console.log("[DATA DONASI]", dataDonasi);

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
        body: data.title as NotificationMobileBodyType,
        type: "announcement",
        deepLink: routeAdminMobile.donationByStatus({ status: "review" }),
        kategoriApp: "DONASI",
      },
    });



      if (!dataDonasi)
        return NextResponse.json({
          status: 400,
          success: false,
          reason: "Gagal menambah donasi",
        });
      const del = await prisma.donasi_TemporaryCreate.delete({
        where: {
          id: data.temporaryId,
        },
      });

      const dataCerita = await prisma.donasi_Cerita.create({
        data: {
          donasiId: dataDonasi.id,
          pembukaan: data.pembukaan,
          cerita: data.cerita,
          imageId: data.imageCeritaId,
        },
      });

      console.log("[DATA CERITA]", dataCerita);

      if (!dataCerita)
        return NextResponse.json({
          status: 400,
          success: false,
          reason: "Gagal menambah cerita donasi",
        });
    }

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Donasi berhasil ditambahkan",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error menambah donasi",
      reason: (error as Error).message,
    });
  }
}

// GET ALL DATA DONASI
async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const authorId = searchParams.get("authorId");
  const page = Number(searchParams.get("page")) || 1; // Default page 1 jika tidak ada
  const takeData = PAGINATION_DEFAULT_TAKE; // Default 10 data per halaman
  const skipData = page * takeData - takeData;
  
  let fixData;
  let totalCount = 0; // Untuk menghitung total data

  try {
    if (category === "beranda") {
      const data = await prisma.donasi.findMany({
        orderBy: {
          publishTime: "desc",
        },
        where: {
          donasiMaster_StatusDonasiId: "1",
          active: true,
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        select: {
          id: true,
          imageId: true,
          title: true,
          publishTime: true,
          progres: true,
          terkumpul: true,
          DonasiMaster_Durasi: {
            select: {
              name: true,
            },
          },
        },
      });

      // Hitung total data untuk pagination
      totalCount = await prisma.donasi.count({
        where: {
          donasiMaster_StatusDonasiId: "1",
          active: true,
        },
      });

      fixData = data.map((v: any) => ({
        ..._.omit(v, ["DonasiMaster_Durasi"]),
        durasiDonasi: v.DonasiMaster_Durasi.name,
      }));
    } else if (category === "my-donation") {
      const data = await prisma.donasi_Invoice.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          authorId: authorId,
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        select: {
          id: true,
          nominal: true,
          donasiMaster_StatusInvoiceId: true,
          DonasiMaster_StatusInvoice: {
            select: {
              name: true,
            },
          },
          Donasi: {
            select: {
              id: true,
              title: true,
              publishTime: true,
              progres: true,
              imageId: true,
              DonasiMaster_Durasi: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      // Hitung total data untuk pagination
      totalCount = await prisma.donasi_Invoice.count({
        where: {
          authorId: authorId,
        },
      });

      fixData = data.map((v: any) => ({
        ..._.omit(v, ["DonasiMaster_StatusInvoice", "Donasi"]),
        statusInvoice: v.DonasiMaster_StatusInvoice.name,
        donasiId: v.Donasi.id,
        title: v.Donasi.title,
        publishTime: v.Donasi.publishTime,
        progres: v.Donasi.progres,
        imageId: v.Donasi.imageId,
        durasiDonasi: v.Donasi.DonasiMaster_Durasi.name,
      }));
    }

    // Hitung total halaman
    const totalPages = Math.ceil(totalCount / takeData);

    return NextResponse.json(
      { 
        success: true, 
        message: "Data berhasil diambil", 
        data: fixData,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalData: totalCount,
          dataPerPage: takeData,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data, coba lagi nanti ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
