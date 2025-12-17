import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const category = searchParams.get("category");

  console.log("[ID]", id);
  console.log("[AUTHOR ID]", authorId);
  console.log("[CATEGORY]", category);

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
        select: {
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

      console.log("[LIST KONTRIBUTOR]", listKontributor);

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
