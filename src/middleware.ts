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
    "/api/auth/*",
    // "/api/origin-url",
    // "/api/job*",

    // ADMIN API
    // >> buat dibawah sini <<
    "/api/admin/donasi/*",
    "/api/admin/investasi/*",
    "/api/admin/collaboration/*",

    // Akses awal
    "/api/get-cookie",
    "/api/user/activation",
    "/api/user-validate",
    "/api/version",

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

  // Handle API requests
  if (pathname.startsWith(apiPath)) {
    const reqToken = req.headers.get("Authorization")?.split(" ")[1];
    if (!reqToken) {
      return setCorsHeaders(unauthorizedResponseToken());
    }

    try {
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
        return setCorsHeaders(unauthorizedResponseAPI());
      }
    } catch (error) {
      console.error("Error validating API request:", error);
      return setCorsHeaders(unauthorizedResponseValidationAPIRequest());
    }
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

      if (userValidateJson.success == true && !userValidateJson.data) {
        unauthorizedResponseDataUserNotFound(req);
      }

      if (!userValidateJson.data.active) {
        return setCorsHeaders(unauthorizedResponseUserNotActive(req));
      }
    } catch (error) {
      console.error("Error validating user:", error);
      if (!token) {
        console.error("Token is undefined");
        return setCorsHeaders(unauthorizedResponseToken());
      }
      return setCorsHeaders(
        await unauthorizedResponseValidationUser({
          loginPath,
          sessionKey,
          token,
          req,
        })
      );
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

function unauthorizedResponse() {
  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function unauthorizedResponseToken() {
  return new NextResponse(JSON.stringify({ error: "Unauthorized token" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function unauthorizedResponseAPI() {
  return new NextResponse(
    JSON.stringify({ error: "Unauthorized Response API" }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function unauthorizedResponseValidationAPIRequest() {
  return new NextResponse(
    JSON.stringify({ error: "Unauthorized validation api request" }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function unauthorizedResponseDataUserNotFound(req: NextRequest) {
  return setCorsHeaders(
    NextResponse.redirect(new URL("/invalid-user", req.url))
  );
}

function unauthorizedResponseUserNotActive(req: NextRequest) {
  return setCorsHeaders(
    NextResponse.redirect(new URL("/waiting-room", req.url))
  );
}

async function unauthorizedResponseValidationUser({
  loginPath,
  sessionKey,
  token,
  req,
}: {
  loginPath: string;
  sessionKey: string;
  token: string;
  req: NextRequest;
}) {
  const userLogout = await fetch(new URL("/api/auth/logout", req.url), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (userLogout.ok) {
    const response = NextResponse.redirect(new URL(loginPath, req.url));
    // Clear invalid token
    response.cookies.delete(sessionKey);
    return setCorsHeaders(response);
  }
  console.error("Error logging out user:", await userLogout.json());
  return setCorsHeaders(
    NextResponse.redirect(new URL("/invalid-user", req.url))
  );
  // return setCorsHeaders(
  //   new NextResponse(JSON.stringify({ error: "Logout failed" }), {
  //     status: 500,
  //     headers: { "Content-Type": "application/json" },
  //   })
  // );
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
