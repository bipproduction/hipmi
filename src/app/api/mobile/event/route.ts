import prisma from "@/lib/prisma";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

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

    console.log("[CAT]", category);
    console.log("[USER]", userId);

    let fixData;

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
            return [];
          }
        }
      }

      // const takeData = 10;
      // const skipData = page * takeData - takeData;

      const data = await prisma.event.findMany({
        //   take: takeData,
        //   skip: skipData,
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
      });

      fixData = data;
    } else if (category === "contribution") {
      const data = await prisma.event_Peserta.findMany({
        where: {
          userId: userId,
        },
        select: {
          eventId: true,
          userId: true,
          Event: {
            select: {
              id: true,
              title: true,
              tanggal: true,
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

          User: {
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
        },
      });

      fixData = data;
    } else if (category === "all-history") {
      fixData = await prisma.event.findMany({
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
      });
    } else if (category === "my-history") {
      fixData = await prisma.event.findMany({
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
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          category === ""
            ? "Success get event, but category is empty"
            : "Success get event",
        data: fixData,
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
