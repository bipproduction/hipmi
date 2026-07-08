// GET /api/auth/google/callback — Google redirect balik ke sini dengan ?code&state.
// Tukar code → verifikasi id_token → lookup Profile.email → session HIPMI atau /google-link.
import {
  exchangeGoogleCode,
  googleRedirectUri,
  verifyGoogleIdToken,
} from "@/lib/auth";
import { sessionCreate } from "@/app/(auth)/_lib/session_create";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const SESSION_KEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
const TOKEN_KEY = process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!;
const SESSION_EXP = "30d";

function redirectTo(req: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, req.url));
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = req.cookies.get("google_oauth_state")?.value;

  // Validasi state (CSRF) + keberadaan code.
  if (!code || !state || !cookieState || state !== cookieState) {
    return redirectTo(req, "/login?error=google_state");
  }

  let email: string;
  let name: string;
  try {
    // redirect_uri harus identik dengan yang dipakai saat consent (host yang sama).
    const redirectUri = googleRedirectUri(url.origin);
    const { id_token } = await exchangeGoogleCode(code, redirectUri);
    const verified = await verifyGoogleIdToken(id_token);
    email = verified.email;
    name = verified.name;
  } catch (error) {
    console.error("Google OAuth callback gagal", error);
    return redirectTo(req, "/login?error=google_oauth");
  }

  // Lookup via Profile.email → bridge ke session HIPMI.
  const profile = await prisma.profile.findUnique({
    where: { email },
    select: { userId: true },
  });

  if (profile?.userId) {
    const dataUser = await prisma.user.findUnique({
      where: { id: profile.userId },
      select: {
        id: true,
        nomor: true,
        username: true,
        active: true,
        masterUserRoleId: true,
      },
    });

    if (dataUser) {
      // sessionCreate set cookie httpOnly (JWT). funGetUserIdByToken men-decode
      // cookie ini untuk resolve userId — jadi cukup ini, tanpa tabel UserSession.
      await sessionCreate({
        sessionKey: SESSION_KEY,
        encodedKey: TOKEN_KEY,
        exp: SESSION_EXP,
        user: dataUser as Record<string, unknown>,
      });

      const response = redirectTo(req, "/dev/home");
      response.cookies.delete("google_oauth_state");
      return response;
    }
  }

  // Profile belum ada → arahkan ke halaman link (input nomor HP).
  const params = new URLSearchParams({ email, name });
  const response = redirectTo(req, `/google-link?${params.toString()}`);
  response.cookies.delete("google_oauth_state");
  return response;
}
