import { NextResponse } from "next/server";
import { decrypt } from "../../../app/(auth)/_lib/decrypt";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";


interface DecryptedUser {
  id: string;
  [key: string]: any;
}

export async function GET(request: Request) {
  const SESSION_KEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY;
  const TOKEN_KEY = process.env.NEXT_PUBLIC_BASE_TOKEN_KEY;

  if (!SESSION_KEY || !TOKEN_KEY) {
    return NextResponse.json(
      { success: false, message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_KEY);

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    const cekUser = (await decrypt({
      token: sessionCookie.value,
      encodedKey: TOKEN_KEY,
    })) as DecryptedUser | null;

    if (!cekUser || !cekUser.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid session" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User session retrieved successfully",
        data: { id: cekUser.id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving user session:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving user session",
        error: (error as Error).message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
