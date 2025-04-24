import { cookies } from "next/headers";
import "colors";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //  const token = req.headers.get("Authorizationx")?.split(" ")[1];
  const SESSIONKEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
  const tokenCookies = cookies().get(SESSIONKEY)?.value;

  const tokenHeader = req.headers.get("Authorization")?.split(" ")[1];

  if (!tokenCookies) return NextResponse.json({ success: false });
  return NextResponse.json({ success: true });

  //   return new Response(token, {
  //     status: 200,
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Cache-Control": "no-store",
  //     },
  //   });
}
