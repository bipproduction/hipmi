import { prisma } from "@/app/lib";
import { sessionCreate } from "../../_lib/session_create";

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

  if (!user)
    return new Response(
      JSON.stringify({ success: false, message: "User not found" }), {status: 404}
    );

  const token = await sessionCreate({
    sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
    encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
    user: user as any,
  });

  return new Response(JSON.stringify({ success: true, token }));
}
