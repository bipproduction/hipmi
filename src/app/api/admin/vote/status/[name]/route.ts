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
  const takeData = 2;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;
    const fixStatus = _.startCase(name);

    if (!page) {
      fixData = await prisma.voting.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          Voting_Status: {
            name: fixStatus,
          },
          isActive: true,
          title: {
            contains: search ? search : "",
            mode: "insensitive",
          },
          isArsip: false,
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          Voting_Kontributor: true,
          Voting_DaftarNamaVote: true,
        },
      });
    } else {
      if (fixStatus === "Publish") {
        const getAllData = await prisma.voting.findMany({
          where: {
            Voting_Status: {
              name: fixStatus,
            },
            isActive: true,
            isArsip: false,
            akhirVote: {
              gte: new Date(),
            },
          },
        });

        for (let i of getAllData) {
          if (moment(i.akhirVote).diff(moment(), "minutes") < 0) {
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

        const data = await prisma.voting.findMany({
          take: takeData,
          skip: skipData,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            Voting_Status: {
              name: fixStatus,
            },
            isActive: true,
            title: {
              contains: search ? search : "",
              mode: "insensitive",
            },
            akhirVote: {
              gte: new Date(),
            },
            isArsip: false,
          },
          include: {
            Author: {
              select: {
                id: true,
                username: true,
                Profile: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            Voting_Kontributor: true,
            Voting_DaftarNamaVote: true,
          },
        });

        const nCount = await prisma.voting.count({
          where: {
            Voting_Status: {
              name: fixStatus,
            },
            isActive: true,
            title: {
              contains: search ? search : "",
              mode: "insensitive",
            },
            akhirVote: {
              gte: new Date(),
            },
            isArsip: false,
          },
        });

        fixData = {
          data: data,
          nPage: _.ceil(nCount / takeData),
        };
      } else {
        const data = await prisma.voting.findMany({
          take: takeData,
          skip: skipData,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            Voting_Status: {
              name: fixStatus,
            },
            isActive: true,
            title: {
              contains: search ? search : "",
              mode: "insensitive",
            },
            isArsip: false,
          },
          include: {
            Author: {
              select: {
                id: true,
                username: true,
                Profile: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            Voting_Kontributor: true,
            Voting_DaftarNamaVote: true,
          },
        });

        const nCount = await prisma.voting.count({
          where: {
            Voting_Status: {
              name: fixStatus,
            },
            isActive: true,
            title: {
              contains: search ? search : "",
              mode: "insensitive",
            },
            isArsip: false,
          },
        });

        fixData = {
          data: data,
          nPage: _.ceil(nCount / takeData),
        };
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data voting status",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data voting status ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data voting status",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
