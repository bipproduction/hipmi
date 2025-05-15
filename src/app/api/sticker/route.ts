import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { POST, GET };

interface IPostSticker {
  fileId: string;
  emotions: string[];
}

async function POST(request: Request) {
  const method = request.method;
  if (method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { fileId, emotions } = await request.json();

    const newStiker = await prisma.sticker.create({
      data: {
        fileId,
        MasterEmotions: {
          connect: emotions.map((value: string) => ({ value })), // id = number[]
        },
      },
    });

    if (!newStiker) {
      return NextResponse.json(
        { success: false, message: "Gagal membuat stiker" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Berhasil membuat stiker" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error create sticker", error);
    return NextResponse.json(
      { success: false, message: "Failed to create sticker" },
      { status: 500 }
    );
  }
}


async function GET(request: Request) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const sticker = await prisma.sticker.findMany({
      include: {
        MasterEmotions: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Success get data sticker", data: sticker },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error get data sticker", error);
    return NextResponse.json(
      { success: false, message: "Error get data sticker" },
      { status: 500 }
    );
  }
}
