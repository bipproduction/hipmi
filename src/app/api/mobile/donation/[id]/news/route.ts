import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import _ from "lodash";

export { POST, GET };

async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data } = await request.json();
  console.log("[ID]", id);
  console.log("[DATA]", data);

  try {
    if (data && data?.imageId) {
      const createWithFile = await prisma.donasi_Kabar.create({
        data: {
          title: data.title,
          deskripsi: data.deskripsi,
          donasiId: id,
          imageId: data.imageId,
        },
      });

      if (!createWithFile)
        return NextResponse.json({ status: 400, message: "Gagal disimpan" });
    } else {
      const create = await prisma.donasi_Kabar.create({
        data: {
          title: data.title,
          deskripsi: data.deskripsi,
          donasiId: id,
        },
      });

      console.log("[CREATE]", create);

      if (!create)
        return NextResponse.json({ status: 400, message: "Gagal disimpan" });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil membuat kabar",
    });
  } catch (error) {
    console.error("[ERROR CREATE NEWS]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Create Donation News",
      reason: (error as Error).message,
    });
  }
}

async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  console.log("[CATEGORY]", category);
  console.log("[ID]", id);

  try {
    if (category === "get-all") {
      fixData = await prisma.donasi_Kabar.findMany({
        where: {
          donasiId: id,
          active: true,
        },
        select: {
          id: true,
          title: true,
          deskripsi: true,
          createdAt: true,
        },
      });
    } else if (category === "get-one") {
      const data = await prisma.donasi_Kabar.findUnique({
        where: {
          id: id,
        },
        include: {
          Donasi: {
            select: {
              authorId: true,
            },
          },
        },
      });

      const authorId = data?.Donasi?.authorId;

      fixData = {
        ..._.omit(data, ["Donasi"]),
        authorId: authorId,
      };
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mengambil kabar",
      data: fixData,
    });
  } catch (error) {
    console.error("[ERROR GET NEWS]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Get Donation News",
      reason: (error as Error).message,
    });
  }
}
