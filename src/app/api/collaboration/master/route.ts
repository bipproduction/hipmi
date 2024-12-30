import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const data = await prisma.projectCollaborationMaster_Industri.findMany({});
    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: data },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Master Collaboration:=========>", error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
