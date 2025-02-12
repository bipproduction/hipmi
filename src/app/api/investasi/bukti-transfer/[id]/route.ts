import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await prisma.images.findUnique({
    where: {
      id: params.id,
    },
    select: {
      url: true,
    },
  });

  if (!fs.existsSync(`./public/investasi/invoice/${data?.url}`)) {
    const fl = fs.readFileSync(`./public/aset/no-img.png`);
    return new NextResponse(fl, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  }
  
  const fl = fs.readFileSync(`./public/investasi/invoice/${data?.url}`);
  return new NextResponse(fl, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
