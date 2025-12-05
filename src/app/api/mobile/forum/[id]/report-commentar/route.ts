import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export { POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  let fixData;
  const { id } = params;
  const { data } = await request.json();
  console.log("[DATA]", data);
  console.log("[ID]", id);

  try {
    const content = await prisma.forum_Komentar.findUnique({
      where: {
        id: id,
      },
    });

    const reportList = await prisma.forumMaster_KategoriReport.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    const msg = `Report Komentar: "${content?.komentar}" dengan kategori \n\n\n${reportList?.title} : \n\n${reportList?.deskripsi}`;
    const res = await fetch(
      `https://wa.wibudev.com/code?nom=6282340374412&text=${msg}`,
      { cache: "no-cache" }
    );

    if (data.categoryId) {
      fixData = await prisma.forum_ReportKomentar.create({
        data: {
          forum_KomentarId: id,
          userId: data.authorId,
          forumMaster_KategoriReportId: data.categoryId as any,
        },
      });
    } else {
      fixData = await prisma.forum_ReportKomentar.create({
        data: {
          forum_KomentarId: id,
          userId: data.authorId,
          deskripsi: data.description,
        },
      });
    }

    if (!fixData) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat report komentar",
      });
    }

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
