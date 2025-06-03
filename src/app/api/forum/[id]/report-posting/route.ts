import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.forum_Posting.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        diskusi: true,
        Forum_ReportPosting: {
          select: {
            id: true,
            deskripsi: true,
            forumMaster_KategoriReportId: true,
            ForumMaster_KategoriReport: true,
          },
        },
      },
    });

    const group = _.groupBy(
      data?.Forum_ReportPosting,
      (val) => val.ForumMaster_KategoriReport?.title
    );
    const getKey = _.keys(group);
    const filterGroup = getKey.map((e) => e.replace("undefined", "Lainnya"));

    const allData = {
      data: data,
      list: filterGroup,
    };

    return NextResponse.json({
      success: true,
      message: "Success get data report posting",
      data: allData,
    });
  } catch (error) {
    console.error("Error get data report posting", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data report posting",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
