import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

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

    // ADMIN API
    // >> buat dibawah sini <<
    
 

    // Akses awal
    "/api/get-cookie",
    "/api/user/activation",
    "/api/user-validate",

    // PAGE
    "/login",
    "/register",
    "/validasi",
    "/splash",
    "/invalid-user",
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
    publicRoutes,
    sessionKey,
    validationApiRoute,
    userPath,
  } = middlewareConfig;

  const { pathname } = req.nextUrl;

  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) {
    return corsResponse;
  }

  // Check if route is public
  const isPublicRoute = isRoutePublic(pathname, publicRoutes, loginPath);
  if (isPublicRoute && pathname !== loginPath) {
    return setCorsHeaders(NextResponse.next());
  }

  // Get token from cookies or Authorization header
  const token = getToken(req, sessionKey);

  // Verify token and get user data
  const user = await verifyToken({ token, encodedKey });

  // Handle login page access
  if (pathname === loginPath) {
    if (user) {
      const response = NextResponse.redirect(new URL(userPath, req.url));
      // Preserve token in cookie when redirecting
      if (token) {
        response.cookies.set(sessionKey, token, {
          // httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
      return setCorsHeaders(response);
    }
    return setCorsHeaders(NextResponse.next());
  }

  // Redirect to login if no user found
  if (!user) {
    const response = NextResponse.redirect(new URL(loginPath, req.url));
    // Clear invalid token
    response.cookies.delete(sessionKey);
    return setCorsHeaders(response);
  }

  // Handle /dev routes that require active status
  if (pathname.startsWith("/dev")) {
    try {
      const userValidate = await fetch(new URL("/api/user-validate", req.url), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userValidate.ok) {
        throw new Error("Failed to validate user");
      }

      const userValidateJson = await userValidate.json();

      if (userValidateJson.success == true && userValidateJson.data == null) {
        return setCorsHeaders(
          NextResponse.redirect(new URL("/invalid-user", req.url))
        );
      }

      if (!userValidateJson.data.active) {
        return setCorsHeaders(
          NextResponse.redirect(new URL("/waiting-room", req.url))
        );
      }
    } catch (error) {
      console.error("Error validating user:", error);
      return setCorsHeaders(unauthorizedResponse());
    }
  }

  // Handle API requests
  if (pathname.startsWith(apiPath)) {
    if (!token) {
      return setCorsHeaders(unauthorizedResponse());
    }

    try {
      const validationResponse = await fetch(
        new URL(validationApiRoute, req.url),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!validationResponse.ok) {
        throw new Error("Failed to validate API request");
      }
    } catch (error) {
      console.error("Error validating API request:", error);
      return setCorsHeaders(unauthorizedResponse());
    }
  }

  const response = NextResponse.next();
  // Ensure token is preserved in cookie
  if (token) {
    response.cookies.set(sessionKey, token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }
  return setCorsHeaders(response);
};

function isRoutePublic(
  pathname: string,
  publicRoutes: string[],
  loginPath: string
): boolean {
  return [...publicRoutes, loginPath].some((route) => {
    const pattern = route.replace(/\*/g, ".*");
    return new RegExp(`^${pattern}$`).test(pathname);
  });
}

function getToken(req: NextRequest, sessionKey: string): string | undefined {
  return (
    req.cookies.get(sessionKey)?.value ||
    req.headers.get("Authorization")?.split(" ")[1]
  );
}

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

  try {
    const enc = new TextEncoder().encode(encodedKey);
    const { payload } = await jwtVerify(token, enc, {
      algorithms: ["HS256"],
    });
    return (payload.user as Record<string, any>) || null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|manifest).*)"],
};
