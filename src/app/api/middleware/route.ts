import { cookies } from "next/headers";
import "colors";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //  const token = req.headers.get("Authorizationx")?.split(" ")[1];
  const SESSIONKEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
  console.log(
    "Token received in API Middleware:",
    SESSIONKEY,
    `<<<<<<<<<<<<<<<`
  );
  const tokenCookies = cookies().get(SESSIONKEY)?.value;
  console.log("Token received in Cookies:", tokenCookies);

  const tokenHeader = req.headers.get("Authorization")?.split(" ")[1];
    console.log("Token received in Header:", tokenHeader);


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
