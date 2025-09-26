import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  let fixData;
  const { id } = params;
  const { data } = await request.json();
  console.log("[DATA]", data);
  console.log("[ID]", id);

  try {
    if (data.categoryId) {
      fixData = await prisma.forum_ReportPosting.create({
        data: {
          forum_PostingId: id,
          userId: data.authorId,
          forumMaster_KategoriReportId: data.categoryId,
        },
      });
    } else {
      fixData = await prisma.forum_ReportPosting.create({
        data: {
          forum_PostingId: id,
          userId: data.authorId,
          deskripsi: data.description,
        },
      });
    }

    if (!fixData) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat report posting",
      });
    }

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil membuat report posting",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal membuat report posting",
      reason: (error as Error).message,
    });
  }
}
