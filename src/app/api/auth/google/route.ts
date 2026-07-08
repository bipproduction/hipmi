// GET /api/auth/google — mulai OAuth: redirect ke consent screen Google.
import { buildGoogleAuthUrl, googleRedirectUri } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET(req: NextRequest) {
  // state acak untuk proteksi CSRF, disimpan di cookie httpOnly & dicocokkan di callback.
  const state = randomBytes(16).toString("hex");

  // redirect_uri mengikuti host request ini (lokal/staging otomatis benar).
  const redirectUri = googleRedirectUri(req.nextUrl.origin);
  const response = NextResponse.redirect(buildGoogleAuthUrl(state, redirectUri));
  response.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 menit
  });
  return response;
}
