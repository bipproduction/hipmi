import prisma from "@/lib/prisma";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
const root = process.cwd();

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

  if (!fs.existsSync(path.join(root, `public/job/${get?.url}`))) {
    const notFile = fs.readFileSync(
      path.join(root, "public/aset/global/no-file.png")
    );
    return new NextResponse(notFile, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  }
  const file = fs.readFileSync(path.join(root, `public/job/${get?.url}`));
  return new NextResponse(file, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
