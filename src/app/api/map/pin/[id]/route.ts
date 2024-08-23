import prisma from "@/app/lib/prisma";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const get = await prisma.images.findUnique({
    where: {
      id: params.id,
    },
    select: {
      url: true,
    },
  });

  if (!fs.existsSync(`./public/map/pin/${get?.url}`)) {
    const notFile = fs.readFileSync("./public/aset/global/no_img.png");
    return new NextResponse(notFile, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  }
  const file = fs.readFileSync(`./public/map/pin/${get?.url}`);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
