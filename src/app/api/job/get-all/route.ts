import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const dataTake = 10;
    const dataSkip = Number(page) * dataTake - dataTake;

    if (search != "") {
      const data = await prisma.job.findMany({
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
            contains: search as string,
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

      return NextResponse.json(
        {
          success: true,
          message: "Berhasil ambil data",
          data: data,
        },
        { status: 200 }
      );
    } else {
      const data = await prisma.job.findMany({
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

      return NextResponse.json(
        {
          success: true,
          message: "Berhasil ambil data",
          data: data,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Gagal ambil data",
    });
  }
}
