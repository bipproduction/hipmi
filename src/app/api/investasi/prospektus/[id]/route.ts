import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // console.log(params.id)
  const data = await prisma.prospektusInvestasi.findUnique({
    where: { id: params.id },
    select: {
      url: true,
    },
  });

  const file = fs.readFileSync(`./public/file/${data?.url}`);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
