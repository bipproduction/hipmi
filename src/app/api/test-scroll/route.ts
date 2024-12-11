import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const page = new URL(req.url).searchParams.get("page");
  if (!page)
    return NextResponse.json({ message: "Page not found" }, { status: 400 });

  const res = await prisma.projectCollaboration_Message.findMany({
    take: 5,
    skip: +page * 5 - 5,
  });

  // return Response.json(res);
}
