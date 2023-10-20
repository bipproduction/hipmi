import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import prisma from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
 

  console.log(params.id)
    const data = await prisma.images.findUnique({
      where: {
        id: params.id,
      },
      select: {
        url: true,
      },
    });

    console.log(data)

    // return data

    if (!fs.existsSync(`./public/investasi/${data?.url}`)) {
      const fl = fs.readFileSync(`./public/aset/no-img.png`);
      return new NextResponse(fl, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    }
    const fl = fs.readFileSync(`./public/investasi/${data?.url}`);
    return new NextResponse(fl, {
      headers: {
        "Content-Type": "image/png",
      },
    });
}
