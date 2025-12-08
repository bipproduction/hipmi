import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  console.log("[ID USER", id);
  console.log("[SEARCH PARAMS", category);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        acceptedForumTermsAt: new Date(),
      },
    });

    if (!updateUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengupdate data",
        },
        { status: 400 }
      );
    }


    return NextResponse.json(
      {
        success: true,
        message: "Syarat dan Ketentuan berhasil diterima",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error update data from API ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
