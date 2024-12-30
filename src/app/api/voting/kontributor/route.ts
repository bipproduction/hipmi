import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const page = searchParams.get("page");
    const takeData = 10;
    const dataSkip = Number(page) * takeData - takeData;
    fixData = await prisma.voting_Kontributor.findMany({
      //   take: takeData,
      //   skip: dataSkip,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        votingId: id,
      },
      include: {
        Author: {
          include: {
            Profile: true,
          },
        },
        Voting_DaftarNamaVote: {
          select: {
            value: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: fixData }, { status: 200 });
  } catch (error) {
    backendLogger.error(error);
    return NextResponse.json(
      { success: false, reason: (error as Error).message || (error as Error) },
      { status: 500 }
    );
  }
}
