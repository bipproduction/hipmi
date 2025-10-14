import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let fixDAta;

  try {
    const user = await prisma.user.count({
      where: {
        active: true,
      },
    });

    const portofolio = await prisma.portofolio.count({
      where: {
        active: true,
      },
    });

    fixDAta = {
      user: user,
      portofolio: portofolio,
    };

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Success get data main dashboard",
      data: fixDAta,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error get data main dashboard",
      reason: (error as Error).message,
    });
  }
}
