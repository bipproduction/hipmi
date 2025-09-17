import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("[ID]", id);

    const data = await prisma.voting.findUnique({
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

    return NextResponse.json({
      success: true,
      message: "Success get voting",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR VOTING]", error);
    return NextResponse.json({
      success: false,
      message: "Error get voting",
      reason: (error as Error).message,
    });
  }
}
