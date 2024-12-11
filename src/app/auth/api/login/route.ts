import { prisma } from "@/app/lib";
import { sessionCreate } from "../../_lib/session_create";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await prisma.user.findUnique({
    where: {
      nomor: "6281339158911",
    },
    select: {
      id: true,
      nomor: true,
    },
  });

  if (!user) return NextResponse.json({ success: false }, { status: 404 });

  const token = await sessionCreate({
    sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
    encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
    user: user as any,
  });

  return NextResponse.json({ success: true, token });
}
