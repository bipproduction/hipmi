import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const dataTake = 10;
    const dataSkip = Number(page) * dataTake - dataTake;

    if (!page) {
      fixData = await prisma.job.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterStatusId: "1",
          isActive: true,
          isArsip: false,
          title: {
            mode: "insensitive",
            contains: search ? search : "",
          },
        },
        select: {
          id: true,
          title: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
        },
      });
    } else {
      fixData = await prisma.job.findMany({
        take: dataTake,
        skip: dataSkip,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterStatusId: "1",
          isActive: true,
          isArsip: false,
          title: {
            mode: "insensitive",
            contains: search ? search : "",
          },
        },
        select: {
          id: true,
          title: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get data job");
    return NextResponse.json({
      success: false,
      message: "Error get data job",
      error: (error as Error).message,
    });
  }
}

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      {
        success: false,
        message: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    const { data } = await request.json();

    const fixData = await prisma.job.create({
      data: {
        title: data.title,
        content: data.content,
        deskripsi: data.deskripsi,
        authorId: data.authorId,
        imageId: data.imageId ?? null,
      },
      select: {
        id: true,
        authorId: true,
        MasterStatus: {
          select: {
            name: true,
          },
        },
        title: true,
      },
    });

    if (!fixData) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed created job",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success created job",
        data: fixData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error created job", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error created job",
        error: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}
