// Google OAuth manual (tanpa library) — kompatibel Next 13.
import { createRemoteJWKSet, jwtVerify } from "jose";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_ISSUERS = ["https://accounts.google.com", "accounts.google.com"];

// redirect_uri ditentukan dari host request (bukan hardcode env), agar lokal
// dan staging masing-masing memakai domainnya sendiri tanpa ganti config.
// Jika GOOGLE_REDIRECT_URI di-set eksplisit, nilai itu menang (override).
export function googleRedirectUri(origin: string) {
  return process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;
}

// URL consent screen Google. `state` dipakai untuk proteksi CSRF.
export function buildGoogleAuthUrl(state: string, redirectUri: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

// Tukar authorization code → token set (berisi id_token).
// redirect_uri WAJIB sama persis dengan yang dipakai saat request consent.
export async function exchangeGoogleCode(code: string, redirectUri: string) {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Google token exchange gagal (${res.status}): ${detail}`);
  }
  return res.json() as Promise<{ id_token: string; access_token: string }>;
}

const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URL));

// Verifikasi id_token Google secara kriptografis (signature + issuer + audience).
export async function verifyGoogleIdToken(idToken: string) {
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: GOOGLE_ISSUERS,
    audience: process.env.GOOGLE_CLIENT_ID!,
  });

  const email = payload.email as string | undefined;
  const emailVerified = payload.email_verified as boolean | undefined;
  const name = (payload.name as string | undefined) ?? "";

  if (!email) throw new Error("id_token Google tidak memuat email");
  if (emailVerified === false) throw new Error("Email Google belum terverifikasi");

  return { email, name };
}
