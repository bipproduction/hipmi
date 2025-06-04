import prisma from "@/lib/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.forum_Komentar.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        komentar: true,
        Forum_Posting: {
          select: {
            id: true,
            diskusi: true,
            Author: {
              select: {
                username: true,
              },
            },
          },
        },

        Forum_ReportKomentar: {
          select: {
            deskripsi: true,
            ForumMaster_KategoriReport: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    const group = _.groupBy(
      data?.Forum_ReportKomentar,
      (v) => v.ForumMaster_KategoriReport?.title
    );

    const getKey = _.keys(group);
    const filterGroup = getKey.map((e) => e.replace("undefined", "Lainnya"));

    const allData = {
      data: data,
      list: filterGroup,
    };

    return NextResponse.json({
      success: true,
      message: "Success get data report komentar",
      data: allData,
    });
  } catch (error) {
    console.error("Error get data report komentar", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data report komentar",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
