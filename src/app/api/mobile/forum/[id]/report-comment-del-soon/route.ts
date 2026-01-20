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
    fixData = await prisma.forum_ReportKomentar.create({
      data: {
        forum_KomentarId: id,
        userId: data.authorId,
        forumMaster_KategoriReportId: data.categoryId as any,
      },
    });
    // if (data.categoryId) {
    //   fixData = await prisma.forum_ReportKomentar.create({
    //     data: {
    //       forum_KomentarId: id,
    //       userId: data.authorId,
    //       forumMaster_KategoriReportId: data.categoryId as any,
    //     },
    //   });
    // } else {
    //   fixData = await prisma.forum_ReportKomentar.create({
    //     data: {
    //       forum_KomentarId: id,
    //       userId: data.authorId,
    //       deskripsi: data.description,
    //     },
    //   });
    // }

    // if (!fixData) {
    //   return NextResponse.json({
    //     status: 400,
    //     success: false,
    //     message: "Gagal membuat report komentar",
    //   });
    // }

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil membuat report komentar",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal membuat report komentar",
      reason: (error as Error).message,
    });
  }
}
