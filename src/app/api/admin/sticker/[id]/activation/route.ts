import { NextResponse } from "next/server"; 
import { prisma } from "@/lib";

export { PUT };

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const method = request.method;
  if (method !== "PUT") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { id } = params;
    const data = await request.json();

    const sticker = await prisma.sticker.update({
      where: {
        id: id,
      },
      data: {
        isActive: data.isActive,
      },
    });

    return NextResponse.json(
      { success: true, message: "Success update data sticker", data: sticker },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error update data sticker", error);
    return NextResponse.json(
      { success: false, message: "Error update data sticker" },
      { status: 500 }
    );
  }
}