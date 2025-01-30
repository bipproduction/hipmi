import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { apies, pages } from "./lib/routes";

type MiddlewareConfig = {
  apiPath: string;
  loginPath: string;
  // validasiPath: string;
  // registarasiPath: string;
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
  // validasiPath: "/validasi",
  // registarasiPath: "/register",
  userPath: "/dev/home",
  publicRoutes: [
    // API
    "/",
    "/api/voting/*",
    "/api/collaboration/*",
    "/api/notifikasi/*",
    "/api/logs/*",
    "/api/job/*",
    "/api/auth/*",
    "/api/origin-url",
    "/api/event/*",
    "/api/master/*",
    // "/api/image/*",
    // "/api/user/*",
    // "/api/new/*",
    // ADMIN API
    // "/api/admin/event/*",
    // "/api/admin/investasi/*",


    // Akses awal
    "/api/get-cookie",
    "/api/user/activation",
    "/api/user-validate",

    // PAGE
    "/login",
    "/register",
    "/validasi",
    "/splash",
    "/job-vacancy",
    "/preview-image",
    "/auth/login",
    "/auth/api/login",
    "/waiting-room",
    "/zCoba/*",

    // ASSETS
    "/aset/global/main_background.png",
    "/aset/logo/logo-hipmi.png",
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
    // validasiPath,
    // registarasiPath,
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
  const isPublicRoute = [
    ...publicRoutes,
    loginPath,
    // validasiPath,
    // registarasiPath,
  ].some((route) => {
    const pattern = route.replace(/\*/g, ".*");
    return new RegExp(`^${pattern}$`).test(pathname);
  });

  // Always protect validation endpoint
  if (pathname === validationApiRoute) {
    const reqToken = req.headers.get("Authorization")?.split(" ")[1];
    if (!reqToken) {
      return setCorsHeaders(unauthorizedResponse());
    }
  }

  if (
    isPublicRoute &&
    pathname !== loginPath
    // &&
    // pathname !== validasiPath &&
    // pathname !== registarasiPath
  ) {
    return setCorsHeaders(NextResponse.next());
  }

  const token =
    req.cookies.get(sessionKey)?.value ||
    req.headers.get("Authorization")?.split(" ")[1];

  // ==================== Authentication: Login, Validasi, Registrasi ==================== //
  // Token verification
  const user = await verifyToken({ token, encodedKey });

  // Handle login page access
  if (pathname === loginPath) {
    if (user) {
      return setCorsHeaders(NextResponse.redirect(new URL(userPath, req.url)));
    }
    return setCorsHeaders(NextResponse.next());
  }

  // // Handle validation page access
  // if (pathname === validasiPath) {
  //   if (user) {
  //     return setCorsHeaders(NextResponse.redirect(new URL(userPath, req.url)));
  //   }
  //   return setCorsHeaders(NextResponse.next());
  // }

  // // Handle register page access
  // if (pathname === registarasiPath) {
  //   if (user) {
  //     return setCorsHeaders(NextResponse.redirect(new URL(userPath, req.url)));
  //   }
  //   return setCorsHeaders(NextResponse.next());
  // }

  // Handle protected routes
  if (!user) {
    return setCorsHeaders(NextResponse.redirect(new URL(loginPath, req.url)));
  }
  // ==================== Authentication: Login, Validasi, Registrasi ==================== //

  if (pathname.startsWith("/dev")) {
    const userValidate = await fetch(new URL("/api/user-validate", req.url), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const userValidateJson = await userValidate.json();

    if (!userValidateJson.data.active) {
      return setCorsHeaders(
        NextResponse.redirect(new URL("/waiting-room", req.url))
      );
    }
  }

  // Handle authenticated API requests
  if (pathname.startsWith(apiPath)) {
    const reqToken = req.headers.get("Authorization")?.split(" ")[1];
    if (!reqToken) {
      return setCorsHeaders(unauthorizedResponse());
    }

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

    const dataJson = await validationResponse.json();
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
