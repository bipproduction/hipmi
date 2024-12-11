import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { apies, pages } from "./lib/routes";

type MiddlewareConfig = {
  apiPath: string;
  loginPath: string;
  userPath: string;
  publicRoutes: string[];
  encodedKey: string;
  sessionKey: string;
  validationApiRoute: string;
  log: boolean;
};

const middlewareConfig: MiddlewareConfig = {
  apiPath: "/api",
  loginPath: "/login",
  userPath: "/dev/home",
  publicRoutes: [
    "/",
    "/api/upload",
    "/api/validation",
    "/api/auth/*",
    "/api/origin-url",
    "/api/user",
    "/api/event/*",
    "/login",
    "/register",
    "/validasi",
    "/splash",
    "/auth/login",
    "/auth/api/login",
    "/aset/global/main_background.png",
    "/aset/logo/logo-hipmi.png",
    "/api/new/*"
  ],
  encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
  validationApiRoute: "/api/validation",
  log: false,
};
export const middleware = async (req: NextRequest) => {
  const {
    apiPath,
    encodedKey,
    loginPath,
    publicRoutes,
    sessionKey,
    validationApiRoute,
    userPath,
  } = middlewareConfig;
  const { pathname } = req.nextUrl;

  // CORS handling
  const corsResponse = handleCors(req);
  if (corsResponse) {
    return setCorsHeaders(corsResponse);
  }

  // Skip authentication for public routes
  const isPublicRoute = [...publicRoutes, loginPath, validationApiRoute].some(
    (route) => {
      const pattern = route.replace(/\*/g, ".*");
      return new RegExp(`^${pattern}$`).test(pathname);
    }
  );

  if (isPublicRoute) {
    return setCorsHeaders(NextResponse.next());
  }

  const token =
    req.cookies.get(sessionKey)?.value ||
    req.headers.get("Authorization")?.split(" ")[1];

  // Token verification
  const user = await verifyToken({ token, encodedKey });

  if (!user) {
    if (pathname.startsWith(apiPath)) {
      return setCorsHeaders(unauthorizedResponse());
    }

    return setCorsHeaders(NextResponse.redirect(new URL(loginPath, req.url)));
  }

  // Redirect authenticated user away from login page
  if (user && pathname === loginPath) {
    return setCorsHeaders(NextResponse.redirect(new URL(userPath, req.url)));
  }

  if (req.nextUrl.pathname.startsWith(apiPath)) {
    const reqToken = req.headers.get("Authorization")?.split(" ")[1];
    // Validate user access with external API
    const validationResponse = await fetch(
      new URL(validationApiRoute, req.url),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${reqToken}`,
        },
      }
    );

    if (!validationResponse.ok) {
      return setCorsHeaders(unauthorizedResponse());
    }
  }

  // Proceed with the request
  return setCorsHeaders(NextResponse.next());
};

function unauthorizedResponse(): NextResponse {
  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function setCorsHeaders(res: NextResponse): NextResponse {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return res;
}

function handleCors(req: NextRequest): NextResponse | null {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }
  return null;
}

async function verifyToken({
  token,
  encodedKey,
}: {
  token: string | undefined;
  encodedKey: string;
}): Promise<Record<string, unknown> | null> {
  if (!token) return null;

  return await decrypt({ token, encodedKey });
}

async function decrypt({
  token,
  encodedKey,
}: {
  token: string;
  encodedKey: string;
}): Promise<Record<string, any> | null> {
  try {
    const enc = new TextEncoder().encode(encodedKey);
    const { payload } = await jwtVerify(token, enc, {
      algorithms: ["HS256"],
    });
    return (payload.user as Record<string, any>) || null;
  } catch (error) {
    console.error("Gagal verifikasi session", error);
    return null;
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|manifest).*)"],
};

// wibu:0.2.82
