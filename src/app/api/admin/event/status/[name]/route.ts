import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;
    const fixStatus = _.startCase(name);

    if (!page) {
      fixData = await prisma.event.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          active: true,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatus,
          },
          title: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          EventMaster_Status: true,
          EventMaster_TipeAcara: true,
        },
      });
    } else {
      if (fixStatus === "Publish") {
        const getAllData = await prisma.event.findMany({
          where: {
            active: true,
            EventMaster_Status: {
              name: fixStatus,
            },
            isArsip: false,
          },
        });

        for (let i of getAllData) {
          if (moment(i.tanggalSelesai).diff(moment(), "minutes") < 0) {
            await prisma.event.update({
              where: {
                id: i.id,
              },
              data: {
                isArsip: true,
              },
            });
          }
        }
      }

      const data = await prisma.event.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          tanggal: "asc",
        },
        where: {
          active: true,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatus,
          },
          title: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          EventMaster_Status: true,
          EventMaster_TipeAcara: true,
        },
      });

      const nCount = await prisma.event.count({
        where: {
          active: true,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatus,
          },
          title: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: `Success get data table event ${name}`,
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data table event dashboard >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed get data table event dashboard",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
