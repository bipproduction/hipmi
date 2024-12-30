import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    fixData = await prisma.voting_DaftarNamaVote.findMany({
      where: {
        votingId: id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
