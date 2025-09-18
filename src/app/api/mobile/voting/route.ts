import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST, GET };

async function POST(request: Request) {
  try {
    const { data } = await request.json();

    console.log("[DATA]", data);

    const create = await prisma.voting.create({
      data: {
        title: data.title,
        deskripsi: data.deskripsi,
        awalVote: data.awalVote,
        akhirVote: data.akhirVote,
        authorId: data.authorId,
      },
    });

    if (!create) return { status: 400, message: "Gagal Membuat Vote" };

    for (let v of data.listVote) {
      const val = v.value;

      const namaVote = await prisma.voting_DaftarNamaVote.create({
        data: {
          value: val,
          votingId: create.id,
        },
      });

      if (!namaVote) return { status: 400, message: "Gagal Membuat List" };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success create voting",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error create voting",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  
  try {
    const data = await prisma.voting.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: "1",
        isArsip: false,
        isActive: true,
        akhirVote: {
          gte: new Date(),
        },
        title: {
          contains: search || "",
          mode: "insensitive",
        },
      },
      include: {
        Voting_DaftarNamaVote: {
          orderBy: {
            createdAt: "asc",
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

    console.log("[DATA]", data);

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
