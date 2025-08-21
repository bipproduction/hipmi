import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await prisma.job.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching job data:", error);
    return NextResponse.json(
      { error: "Failed to fetch job data" },
      { status: 500 }
    );
  }
}
