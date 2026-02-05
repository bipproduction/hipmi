import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";
import prisma from "@/lib/prisma";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import { NotificationMobileBodyType } from "../../../../../types/type-mobile-notification";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET, POST };

async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const create = await prisma.event.create({
      data: {
        title: _.startCase(data.title),
        lokasi: data.lokasi,
        deskripsi: data.deskripsi,
        eventMaster_TipeAcaraId: data.eventMaster_TipeAcaraId,
        tanggal: data.tanggal,
        tanggalSelesai: data.tanggalSelesai,
        authorId: data.authorId,
      },
      select: {
        id: true,
        title: true,
        EventMaster_Status: {
          select: {
            name: true,
          },
        },
        authorId: true,
      },
    });

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
        body: create.title as NotificationMobileBodyType,
        type: "announcement",
        deepLink: routeAdminMobile.eventByStatus({ status: "review" }),
        kategoriApp: "EVENT",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil disimpan",
        data: create,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error create event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const userId = searchParams.get("userId");
    const page = Number(searchParams.get("page")) || 1;
    const takeData = PAGINATION_DEFAULT_TAKE;
    const skipData = page * takeData - takeData;

    console.log("[CAT]", category);
    console.log("[USER]", userId);

    let fixData;
    let totalCount = 0;

    if (category === "beranda") {
      const allData = await prisma.event.findMany({
        where: {
          active: true,
          eventMaster_StatusId: "1",
          isArsip: false,
        },
      });

      for (let i of allData) {
        if (moment(i.tanggalSelesai).diff(moment(), "minutes") < 0) {
          const updateArsip = await prisma.event.update({
            where: {
              id: i.id,
            },
            data: {
              isArsip: true,
            },
          });

          if (!updateArsip) {
            console.log("gagal update arsip");
          }
        }
      }

      const [data, count] = await Promise.all([
        prisma.event.findMany({
          take: takeData,
          skip: skipData,
          orderBy: [
            {
              tanggal: "asc",
            },
          ],
          where: {
            active: true,
            eventMaster_StatusId: "1",
            isArsip: false,
          },
          select: {
            id: true,
            title: true,
            deskripsi: true,
            tanggal: true,
            tanggalSelesai: true,
            EventMaster_Status: {
              select: {
                name: true,
              },
            },
            authorId: true,
            Author: {
              include: {
                Profile: true,
              },
            },
          },
        }),
        prisma.event.count({
          where: {
            active: true,
            eventMaster_StatusId: "1",
            isArsip: false,
          },
        })
      ]);

      fixData = data;
      totalCount = count;
    } else if (category === "contribution") {
      const [data, count] = await Promise.all([
        prisma.event_Peserta.findMany({
          take: takeData,
          skip: skipData,
          where: {
            userId: userId,
          },
          select: {
            id: true,
            eventId: true,
            userId: true,
            Event: {
              select: {
                id: true,
                title: true,
                tanggal: true,
                Author: {
                  select: {
                    id: true,
                    username: true,
                    Profile: {
                      select: {
                        id: true,
                        name: true,
                        imageId: true,
                      },
                    },
                  },
                },
                Event_Peserta: {
                  take: 4,
                  orderBy: {
                    createdAt: "desc",
                  },
                  select: {
                    id: true,
                    userId: true,
                    User: {
                      select: {
                        Profile: {
                          select: {
                            id: true,
                            name: true,
                            imageId: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }),
        prisma.event_Peserta.count({
          where: {
            userId: userId,
          },
        })
      ]);

      fixData = data;
      totalCount = count;
    } else if (category === "all-history") {
      const [data, count] = await Promise.all([
        prisma.event.findMany({
          take: takeData,
          skip: skipData,
          orderBy: {
            tanggal: "desc",
          },
          where: {
            eventMaster_StatusId: "1",
            isArsip: true,
          },
          select: {
            id: true,
            title: true,
            tanggal: true,
            deskripsi: true,
            active: true,
            authorId: true,
            Author: {
              select: {
                id: true,
                username: true,
                Profile: true,
              },
            },
          },
        }),
        prisma.event.count({
          where: {
            eventMaster_StatusId: "1",
            isArsip: true,
          },
        })
      ]);

      fixData = data;
      totalCount = count;
    } else if (category === "my-history") {
      const [data, count] = await Promise.all([
        prisma.event.findMany({
          take: takeData,
          skip: skipData,
          orderBy: {
            tanggal: "desc",
          },
          where: {
            authorId: userId,
            eventMaster_StatusId: "1",
            isArsip: true,
          },
          select: {
            id: true,
            title: true,
            tanggal: true,
            deskripsi: true,
            active: true,
            authorId: true,
            Author: {
              select: {
                id: true,
                username: true,
                Profile: true,
              },
            },
          },
        }),
        prisma.event.count({
          where: {
            authorId: userId,
            eventMaster_StatusId: "1",
            isArsip: true,
          },
        })
      ]);

      fixData = data;
      totalCount = count;
    }

    const totalPages = Math.ceil(totalCount / takeData);

    return NextResponse.json(
      {
        success: true,
        message: "Success get event",
        data: fixData,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalData: totalCount,
          dataPerPage: takeData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
