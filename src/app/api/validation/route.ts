import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    console.warn("Token is missing in /api/validation");
    return NextResponse.json(
      { success: false, error: "Token missing" },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!
    );
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (!payload || typeof payload !== "object" || !payload.user) {
      console.warn("Invalid payload structure in /api/validation:", payload);
      return NextResponse.json(
        { success: false, error: "Invalid token payload" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: payload.user,
    });
  } catch (err) {
    console.error("Token verification failed in /api/validation:", err);
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

// Optional: handle disallowed methods
export async function POST() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}


// ==== Versi 1.4.5 ==== //

// export async function GET(req: Request) {
//   const token = req.headers.get("Authorization")?.split(" ")[1];

//   if (!token) return NextResponse.json({ success: false }, { status: 401 });

//   return NextResponse.json({ success: true });
// }
