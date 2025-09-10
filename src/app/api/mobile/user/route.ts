import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const data = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
      where: {
        username: {
          contains: search || "",
          mode: "insensitive",
        },
        active: true,
        NOT: {
          Profile: null,
        },
        OR: [
          {
            MasterUserRole: {
              name: "User",
            },
          },
          {
            MasterUserRole: {
              name: "Admin",
            },
          },
        ],
      },
      include: {
        Profile: {
          select: {
            id: true,
            name: true,
            imageId: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }

  // try {
  //   const { searchParams } = new URL(request.url);
  //   const token = searchParams.get("token");

  //   const dataUser = await decrypt({
  //     token: token!,
  //     encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  //   });

  //   const id = dataUser?.id;
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id: id as string,
  //     },
  //   });

  //   return NextResponse.json(
  //     {
  //       success: true,
  //       message: "Berhasil mendapatkan data",
  //       data: user,
  //     },
  //     {
  //       status: 200,
  //     }
  //   );
  // } catch (error) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: "Gagal mendapatkan data",
  //       reason: (error as Error).message,
  //     },
  //     {
  //       status: 500,
  //     }
  //   );
  // } finally {
  //   await prisma.$disconnect();
  // }
}
