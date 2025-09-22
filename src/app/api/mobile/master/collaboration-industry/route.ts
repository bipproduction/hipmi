import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(request: Request) {
  try {

    const data = await prisma.projectCollaborationMaster_Industri.findMany({
      orderBy: {
        id: "asc",
      },
    });
    
    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
