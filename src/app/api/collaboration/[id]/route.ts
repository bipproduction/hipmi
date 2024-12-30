import { prisma } from "@/app/lib";
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

    // Buatkan api untuk list partisipasi

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
