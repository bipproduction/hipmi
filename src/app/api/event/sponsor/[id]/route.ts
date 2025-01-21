import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const method = request.method;
  if (method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { id } = context.params;

  const body = await request.json();
  console.log("body", body);
  console.log("id", id);

  // const res = await prisma.eventSponsor.create({

  // })

  return NextResponse.json({
    success: true,
    message: "Success create sponsor",
  });

  //   try {
  //     const { id } = context.params;

  //     const body = await request.json();
  //     console.log("body",body);
  //     console.log("id",id);

  //     // const res = await prisma.eventSponsor.create({

  //     // })

  //     return NextResponse.json({
  //       success: true,
  //       message: "Success create sponsor",
  //     });
  //   } catch (error) {
  //     return NextResponse.json(
  //       { success: false, message: "Failed create sponsor" },
  //       { status: 500 }
  //     );
  //   }
}
