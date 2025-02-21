import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await prisma.job.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: {
          select: {
            username: true,
            nomor: true,
            Profile: {
              select: {
                name: true,
                alamat: true,
              },
            },
          },
        },
        MasterStatus: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success get data job-vacancy",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data job-vacancy", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data job-vacancy",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
