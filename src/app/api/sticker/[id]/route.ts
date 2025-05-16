import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET, PUT, DELETE };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { id } = params;

    const sticker = await prisma.sticker.findUnique({
      where: {
        id: id,
      },
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

    if (data.fileId) {
      const updatedDataWithFile = await prisma.sticker.update({
        where: {
          id: id,
        },
        data: {
          fileId: data.fileId,
          MasterEmotions: {
            set: data.emotions.map((value: string) => ({ value })), // ✅ replace relasi
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Sticker updated successfully",
        data: updatedDataWithFile,
      });
    }

    const updatedDataWithoutFile = await prisma.sticker.update({
      where: {
        id: id,
      },
      data: {
        MasterEmotions: {
          set: data.emotions.map((value: string) => ({ value })), // ✅ replace relasi
        },
      },
    });

    if (!updatedDataWithoutFile) {
      return NextResponse.json(
        { success: false, message: "Failed to update sticker" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sticker updated successfully",
      data: updatedDataWithoutFile,
    });
  } catch (error) {
    console.error("Error updating sticker:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update sticker" },
      { status: 500 }
    );
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const method = request.method;
  if (method !== "DELETE") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { id } = params;

    const sticker = await prisma.sticker.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Success delete sticker", data: sticker },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error delete sticker", error);
    return NextResponse.json(
      { success: false, message: "Error delete sticker" },
      { status: 500 }
    );
  }
}
