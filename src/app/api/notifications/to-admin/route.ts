import { NextResponse } from "next/server";
import {prisma} from "@/lib"

interface NotificationData {
  userId: string;
  appId: string;
  status: string;
  title: string;
  pesan: string;
  kategoriApp: string;
}

export async function POST(request: Request) {
  try {
    const { data }: { data: NotificationData } = await request.json();

    // Validasi input
    if (!data || !data.userId || !data.title || !data.pesan) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Ambil semua admin aktif
    const getAdmin = await prisma.user.findMany({
      where: {
        active: true,
        masterUserRoleId: "2",
      },
    });

    // Buat notifikasi untuk semua admin secara paralel
    const createPromises = getAdmin.map((a) =>
      prisma.notifikasi.create({
        data: {
          adminId: a.id,
          userId: data.userId,
          appId: data.appId,
          status: data.status,
          title: data.title,
          pesan: data.pesan,
          kategoriApp: data.kategoriApp,
          userRoleId: "2",
        },
      })
    );

    await Promise.all(createPromises);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully created notifications for admins",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notification for admin:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating notification for admin",
        error: (error as Error).message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
