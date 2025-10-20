import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await prisma.voting.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: true,
        Voting_Status: true,
        Voting_DaftarNamaVote: true,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success get data voting",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR GET DATA VOTING]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data voting",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
