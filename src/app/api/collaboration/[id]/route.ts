import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    let fixData;
    const { id } = context.params;
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const page = searchParams.get("page");
    const takeData = 10;
    const dataSkip = Number(page) * takeData - takeData;

    // Buatkan api untuk list partisipasi

    const userLoginId = await funGetUserIdByToken();

    if (userLoginId == null) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mendapatkan data, user id tidak ada",
        },
        { status: 500 }
      );
    }

    if (kategori == "detail") {
      fixData = await prisma.projectCollaboration.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          isActive: true,
          title: true,
          lokasi: true,
          purpose: true,
          benefit: true,
          createdAt: true,
          // jumlah_partisipan: true,
          Author: {
            select: {
              id: true,
              Profile: true,
            },
          },
          ProjectCollaborationMaster_Industri: true,
          ProjectCollaboration_Partisipasi: {
            where: {
              isActive: true,
            },
          },
        },
      });
    } else if (kategori == "list_partisipan") {
      fixData = await prisma.projectCollaboration_Partisipasi.findMany({
        take: takeData,
        skip: dataSkip,
        where: {
          projectCollaborationId: id,
          isActive: true,
        },
        select: {
          id: true,
          User: {
            select: {
              id: true,
              Profile: true,
            },
          },
          deskripsi_diri: true,
        },
      });
    } else if (kategori == "cek_partisipasi") {
      const cek = await prisma.projectCollaboration_Partisipasi.findFirst({
        where: {
          projectCollaborationId: id,
          userId: userLoginId,
        },
      });

      if (cek === null) {
        fixData = false;
      } else {
        fixData = true;
      }
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get collaboration by id", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
