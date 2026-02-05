import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page"));
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = page ? page * takeData - takeData : 0;

  let fixData;

  try {
    if (category === "checked") {
      const cek = await prisma.voting_Kontributor.count({
        where: {
          authorId: authorId,
          votingId: id,
        },
      });

      const cekPilihan = await prisma.voting_Kontributor.findFirst({
        where: {
          authorId: authorId,
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

      if (cek > 0) {
        fixData = true;
      } else {
        fixData = false;
      }

      fixData = {
        isContribution: cek > 0,
        nameChoice: cekPilihan?.Voting_DaftarNamaVote?.value,
      };
    } else if (category === "list") {
      const listKontributor = await prisma.voting_Kontributor.findMany({
        where: {
          votingId: id,
        },
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        select: {
          id: true,
          Voting_DaftarNamaVote: {
            select: {
              value: true,
            },
          },
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                  imageId: true,
                },
              },
            },
          },
        },
      });

      fixData = listKontributor;
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data",
      reason: (error as Error).message,
    });
  }
}
