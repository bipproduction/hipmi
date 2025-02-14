import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (request.method !== "PUT") {
    return NextResponse.json(
      {
        success: false,
        message: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    const { id } = params;
    const { data } = await request.json();

    const updateData = await prisma.portofolio_MediaSosial.update({
      where: {
        id: id,
      },
      data: {
        facebook: data.facebook,
        instagram: data.instagram,
        tiktok: data.tiktok,
        twitter: data.twitter,
        youtube: data.youtube,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil update data",
        data: updateData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error update data", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error update data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
