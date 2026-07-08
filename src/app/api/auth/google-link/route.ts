// POST /api/auth/google-link
// Body: { nomor, email, username?, confirmOverride? }
// Menangani 3 skenario: link email baru, override email berbeda, register pendaftar baru.
import { sessionCreate } from "@/app/(auth)/_lib/session_create";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const SESSION_KEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
const TOKEN_KEY = process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!;
const SESSION_EXP = "30d";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  return `${local[0]}***@${domain}`;
}

export async function POST(req: Request) {
  const { nomor, email, username, confirmOverride } = await req.json();

  if (!nomor || !email) {
    return NextResponse.json(
      { success: false, message: "Nomor dan email wajib diisi" },
      { status: 400 }
    );
  }

  const dataUser = await prisma.user.findUnique({
    where: { nomor },
    select: {
      id: true,
      nomor: true,
      username: true,
      active: true,
      masterUserRoleId: true,
      Profile: { select: { id: true, email: true } },
    },
  });

  // --- Skenario 3: Pendaftar baru (nomor belum terdaftar) ---
  if (!dataUser) {
    if (!username) {
      // Minta frontend menampilkan field username.
      return NextResponse.json({ success: true, status: "NEED_USERNAME" });
    }

    // Email Google mungkin sudah dipakai Profile lain → cegah duplikat (email @unique).
    const emailTaken = await prisma.profile.findUnique({
      where: { email },
      select: { id: true },
    });
    if (emailTaken) {
      return NextResponse.json(
        { success: false, message: "Email sudah terhubung ke akun lain" },
        { status: 400 }
      );
    }

    const usernameTaken = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (usernameTaken) {
      return NextResponse.json(
        { success: false, message: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: { nomor, username, active: false },
    });

    await prisma.profile.create({
      data: {
        name: username,
        email,
        alamat: "-",
        jenisKelamin: "-",
        userId: newUser.id,
      },
    });

    await sessionCreate({
      sessionKey: SESSION_KEY,
      encodedKey: TOKEN_KEY,
      exp: SESSION_EXP,
      user: {
        id: newUser.id,
        nomor,
        username,
        active: false,
        masterUserRoleId: newUser.masterUserRoleId,
      } as Record<string, unknown>,
    });

    return NextResponse.json({ success: true, status: "REGISTERED" });
  }

  const profile = dataUser.Profile;

  // --- Skenario 2: Email sudah ada tapi BERBEDA → minta konfirmasi override ---
  if (profile?.email && profile.email !== email && !confirmOverride) {
    return NextResponse.json({
      success: true,
      status: "CONFIRM_OVERRIDE",
      existingEmailMasked: maskEmail(profile.email),
    });
  }

  // Email Google tidak boleh bentrok dengan Profile milik user lain.
  const emailOwner = await prisma.profile.findUnique({
    where: { email },
    select: { id: true },
  });
  if (emailOwner && emailOwner.id !== profile?.id) {
    return NextResponse.json(
      { success: false, message: "Email sudah terhubung ke akun lain" },
      { status: 400 }
    );
  }

  // --- Skenario 1: Set / update Profile.email lalu login ---
  if (profile) {
    await prisma.profile.update({
      where: { id: profile.id },
      data: { email },
    });
  }

  const { Profile: _ignored, ...userWithoutProfile } = dataUser;

  await sessionCreate({
    sessionKey: SESSION_KEY,
    encodedKey: TOKEN_KEY,
    exp: SESSION_EXP,
    user: userWithoutProfile as Record<string, unknown>,
  });

  return NextResponse.json({ success: true, status: "LINKED" });
}
