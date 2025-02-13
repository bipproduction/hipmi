import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export { GET, PUT };

async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const get = await prisma.images.findUnique({
    where: {
      id: params.id,
    },
    select: {
      url: true,
    },
  });

  if (!fs.existsSync(`./public/portofolio/logo/${get?.url}`)) {
    const notFile = fs.readFileSync("./public/aset/global/no_img.png");
    return new NextResponse(notFile, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  }
  const file = fs.readFileSync(`./public/portofolio/logo/${get?.url}`);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

async function PUT(
  request: NextRequest,
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
    const portofolioId = id;

    const { data } = await request.json();
    const logoId = data;

    const updatePorto = await prisma.portofolio.update({
      where: {
        id: portofolioId,
      },
      data: {
        logoId: logoId,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengubah Logo Bisnis!",
        data: updatePorto,
      },
      { status: 200 } // default status: 200
    );
  } catch (error) {
    backendLogger.error("API Error Update Logo Portofolio", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
