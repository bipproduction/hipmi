import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    let fixData;
    const { id } = context.params;

    fixData = await prisma.voting.findFirst({
      where: {
        id: id,
      },
      include: {
        Voting_DaftarNamaVote: {
          orderBy: {
            createdAt: "asc",
          },
          where: {
            isActive: true,
          },
        },
        Author: {
          select: {
            Profile: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Gagal mendapatkan data voting by id", error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
