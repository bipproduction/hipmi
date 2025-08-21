import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  try {
    let fixData;
    fixData = await prisma.voting.count({
      where: {
        Voting_Status: {
          name: "Publish",
        },
        isActive: true,
        akhirVote: {
          lte: new Date(),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get data voting dashboard",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data voting dashboard >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data voting dashboard",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  } 
}
