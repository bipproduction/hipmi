import { prisma } from "@/lib";
import { funSendToWhatsApp } from "@/lib/code-otp-sender";
import _ from "lodash";
import { NextResponse } from "next/server";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Success get data user access",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error get data user access",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  console.log("Received data:", data);
  console.log("User ID:", id);
  console.log("Category:", category);

  try {
    if (category === "access") {
      const updateData = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          active: data.active,
        },
        select: {
          nomor: true,
        },
      });

      if (data.active) {
        const resSendCode = await funSendToWhatsApp({
          nomor: updateData.nomor,
          newMessage:
            "Halo sahabat HIConnect, \nSelamat akun anda telah aktif ! \n\n*Pesan ini di kirim secara otomatis, tidak perlu di balas.",
        });
      } else {
        const resSendCode = await funSendToWhatsApp({
          nomor: updateData.nomor,
          newMessage:
            "Halo sahabat HIConnect, \nMohon maaf akun anda telah dinonaktifkan ! Hubungi admin untuk informasi lebih lanjut. \n\n*Pesan ini di kirim secara otomatis, tidak perlu di balas.",
        });
      }

      console.log("[Update Active Berhasil]", updateData);
    } else if (category === "role") {
      const fixName = _.startCase(data.role.replace(/_/g, " "));

      const checkRole = await prisma.masterUserRole.findFirst({
        where: {
          name: fixName,
        },
      });

      console.log("[CHECK ROLE]", checkRole);

      const updateData = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          masterUserRoleId: checkRole?.id,
        },
      });

      console.log("[Update Role Berhasil]", updateData);
    } else {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid category",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Success update data user access",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error update data user access",
      reason: (error as Error).message,
    });
  }
}
