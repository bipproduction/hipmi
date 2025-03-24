import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validasi ID
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const data = await prisma.voting_Kontributor.findMany({
      where: {
        votingId: id,
      },
      select: {
        Voting_DaftarNamaVote: true,
        Author: {
          select: {
            username: true,
            Profile: true,
          },
        },
      },
    });

    // Penanganan data tidak ditemukan
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Voting data not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error fetching voting data >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching voting data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
