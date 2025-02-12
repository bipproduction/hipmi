import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param id | votingId
 * @param kategori | kontribusi
 * @returns
 */
export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const kategori = searchParams.get("kategori");

    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId) {
      return NextResponse.json(
        { success: false, message: "Gagal mendapatkan data, coba lagi nanti " },
        { status: 500 }
      );
    }

    if (kategori == "isKontributor") {
      const cek = await prisma.voting_Kontributor.count({
        where: {
          authorId: userLoginId,
          votingId: id,
        },
      });

      if (cek > 0) {
        fixData = true;
      } else {
        fixData = false;
      }
    } else if (kategori == "pilihan") {
      const cekPilihan = await prisma.voting_Kontributor.findFirst({
        where: {
          authorId: userLoginId,
          votingId: id,
        },
        select: {
          Voting_DaftarNamaVote: {
            select: {
              value: true,
            },
          },
        },
      });

      fixData = cekPilihan?.Voting_DaftarNamaVote?.value
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get hitung voting", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
