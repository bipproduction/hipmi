import _ from "lodash";
import { prisma } from "@/lib";
import { NextResponse } from "next/server";
import moment from "moment";

export { GET };

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const fixStatus = _.startCase(category || "");

  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;
  let fixData;

  console.log("[CATEGORY]", category);
  //   console.log("[FIX STATUS]", fixStatus);

  try {
    if (category === "dashboard") {
      const publish = await prisma.event.count({
        where: {
          EventMaster_Status: {
            name: "Publish",
          },
          isArsip: false,
        },
      });

      const review = await prisma.event.count({
        where: {
          EventMaster_Status: {
            name: "Review",
          },
          isArsip: false,
        },
      });

      const reject = await prisma.event.count({
        where: {
          EventMaster_Status: {
            name: "Reject",
          },
          isArsip: false,
        },
      });

      const history = await prisma.event.count({
        where: {
          EventMaster_Status: {
            name: "Publish",
          },
          isArsip: true,
        },
      });

      const typeOfEvent = await prisma.eventMaster_TipeAcara.count({
        where: {
          active: true,
        },
      });

      fixData = {
        publish,
        review,
        reject,
        history,
        typeOfEvent,
      };
    } else if (category === "history") {
      console.log("[HISTORY HERE]");

      const data = await prisma.event.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isArsip: true,
          EventMaster_Status: {
            name: "Publish",
          },
          title: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
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
        },
      });

      fixData = data;
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
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
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
            contains: search || "",
            mode: "insensitive",
          },
        },
        select: {
            id: true,
            title: true,
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
          },
      });

      fixData = data;
    }

    return NextResponse.json(
      {
        success: true,
        message: `Success get data event ${category}`,
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`[ERROR GET DATA EVENT: ${category}]`, error);
    return NextResponse.json(
      {
        success: false,
        message: `Error get data event ${category}`,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
