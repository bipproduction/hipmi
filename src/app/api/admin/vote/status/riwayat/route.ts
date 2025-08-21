import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.voting.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          voting_StatusId: "1",
          isActive: true,
          akhirVote: {
            lte: new Date(),
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
      const data = await prisma.voting.findMany({
        skip: skipData,
        take: takeData,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          voting_StatusId: "1",
          isActive: true,
          akhirVote: {
            lte: new Date(),
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
          voting_StatusId: "1",
          isActive: true,
          akhirVote: {
            lte: new Date(),
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
        message: "Success get data voting riwayat",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data voting riwayat ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data voting riwayat",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
