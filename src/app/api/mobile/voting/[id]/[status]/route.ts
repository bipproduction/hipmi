import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, PUT };

async function GET(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  try {
    const { id, status } = params;
    console.log("[ID]", id);
    const fixStatusName = _.startCase(status);
    console.log("[STATUS]", fixStatusName);

    let fixData;

    if (fixStatusName === "Publish") {
      fixData = await prisma.voting.findMany({
        where: {
          authorId: id,
          isActive: true,
          akhirVote: {
            gte: new Date(),
          },
          Voting_Status: {
            name: fixStatusName,
          },
        },
      });
    } else {
      fixData = await prisma.voting.findMany({
        where: {
          authorId: id,
          Voting_Status: {
            name: fixStatusName,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Success get voting",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Error get voting",
      reason: (error as Error).message,
    });
  }
}

async function PUT(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  try {
    const { id, status } = params;
    console.log("[ID]", id);
    const fixStatusName = _.startCase(status);
    console.log("[STATUS]", fixStatusName);

    const checkData = await prisma.voting.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        Voting_Status: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log("[CHECKDATA]", checkData);

    if (!checkData)
      return NextResponse.json({
        success: false,
        message: "Voting tidak ditemukan",
      });

    if (checkData?.Voting_Status?.name === "Publish") {
      return NextResponse.json({
        success: false,
        message: "Voting telah terpublish",
      });
    }

    const checkStatus = await prisma.masterStatus.findFirst({
      where: {
        name: fixStatusName,
      },
    });

    if (!checkStatus)
      return NextResponse.json({
        success: false,
        message: "Status tidak ditemukan",
      });

    const updateData = await prisma.voting.update({
      where: {
        id: id,
      },
      data: {
        voting_StatusId: checkStatus.id,
      },
    });

    console.log("[UPDATE]", updateData);

    return NextResponse.json({
      success: true,
      message: "Success update voting",
      data: updateData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Error update voting",
      reason: (error as Error).message,
    });
  }
}
