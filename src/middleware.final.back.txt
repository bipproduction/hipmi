import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

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

const CONFIG: MiddlewareConfig = {
  apiPath: "/api",
  loginPath: "/login",
  userPath: "/dev/home",
  publicRoutes: [
    "/",
    "/api/not-user/*",
    "/api/voting/*",
    "/api/collaboration/*",
    "/api/notifikasi/*",
    "/api/logs/*",
    "/api/auth/*",
    "/api/admin/donasi/*",
    "/api/admin/investasi/*",
    "/api/admin/collaboration/*",
    "/api/get-cookie",
    "/api/user/activation",
    "/api/user-validate",
    "/api/version",
    "/api/validation",
    "/login",
    "/register",
    "/validasi",
    "/splash",
    "/invalid-user",
    "/job-vacancy/*",
    "/preview-image",
    "/auth/login",
    "/auth/api/login",
    "/waiting-room",
    "/zCoba/*",
    "/aset/global/main_background.png",
    "/aset/logo/logo-hipmi.png",
  ],
  encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
  validationApiRoute: "/api/validation",
  log: false,
};

export const middleware = async (req: NextRequest) => {
  const { apiPath, encodedKey, loginPath, publicRoutes, sessionKey, userPath } =
    CONFIG;

  const { pathname } = req.nextUrl;

  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Check if route is public
  const isPublicRoute = isRoutePublic(pathname, publicRoutes, loginPath);
  if (isPublicRoute && pathname !== loginPath) {
    return setCorsHeaders(NextResponse.next());
  }

  // Get token from cookie or Authorization header
  const token = getToken(req, sessionKey);
  const user = await verifyToken({ token, encodedKey });
  // console.log("user >>", user);

  // Handle login page access
  if (pathname === loginPath) {
    if (user) {
      const response = NextResponse.redirect(new URL(userPath, req.url));
      if (token) setTokenCookie(response, sessionKey, token);
      return setCorsHeaders(response);
    }
    return setCorsHeaders(NextResponse.next());
  }

  // Redirect to login if no valid user
  if (!user) {
    const response = NextResponse.redirect(new URL(loginPath, req.url));
    deleteTokenCookie(response, sessionKey);
    return setCorsHeaders(response);
  }

  // Handle API requests under /api
  if (pathname.startsWith(apiPath)) {
    if (!token) return setCorsHeaders(unauthorizedResponseTokenAPI());

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || new URL(req.url).origin;
      const validationResponse = await fetch(
        `${apiBaseUrl}${CONFIG.validationApiRoute}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!validationResponse.ok) {
        console.error("Validation failed:", validationResponse.statusText);
        return setCorsHeaders(unauthorizedResponseAPI());
      }

      const validationData = await validationResponse.json();
      if (validationData.success === false) {
        return setCorsHeaders(unauthorizedResponseDataUserNotFound(req));
      }
    } catch (error) {
      console.error("Error validating API request:", error);
      return setCorsHeaders(unauthorizedResponseValidationAPIRequest());
    }
  }

  // Handle /dev routes - active user check
  if (pathname.startsWith("/dev")) {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || new URL(req.url).origin;
      const userValidateResponse = await fetch(
        `${apiBaseUrl}/api/user-validate`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userValidateResponse.ok) {
        console.error(
          "User validation failed:",
          userValidateResponse.statusText
        );
        return setCorsHeaders(unauthorizedResponseAPIUserValidate(req));
      }

      const userValidateJson = await userValidateResponse.json();

      if (userValidateJson.success === true && !userValidateJson.data) {
        return setCorsHeaders(unauthorizedResponseDataUserNotFound(req));
      }

      if (!userValidateJson.data.active) {
        return setCorsHeaders(unauthorizedResponseUserNotActive(req));
      }
    } catch (error) {
      console.error("Error during user validation API:", error);
      if (!token) return setCorsHeaders(unauthorizedResponseTokenPAGE());
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

  if (pathname.startsWith("/dev/admin")) {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || new URL(req.url).origin;
      const userValidateResponse = await fetch(
        `${apiBaseUrl}/api/user-validate`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userValidateResponse.ok) {
        console.error(
          "User validation failed:",
          userValidateResponse.statusText
        );
        return setCorsHeaders(unauthorizedResponseAPIUserValidate(req));
      }

      const userValidateJson = await userValidateResponse.json();
      // console.log("data json >>", userValidateJson.data);

      if (userValidateJson.success === true && !userValidateJson.data) {
        return setCorsHeaders(unauthorizedResponseDataUserNotFound(req));
      }

      if (userValidateJson.data.masterUserRoleId === "1") {
        return setCorsHeaders(unauthorizedResponseUserNotAdmin(req));
      }

      if (!userValidateJson.data.active) {
        return setCorsHeaders(unauthorizedResponseUserNotActive(req));
      }
    } catch (error) {
      console.error("Error during user validation API:", error);
      if (!token) return setCorsHeaders(unauthorizedResponseTokenPAGE());
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

  // Default: proceed with request and add CORS headers
  const response = NextResponse.next();
  return setCorsHeaders(response);
};

// ========================== HELPERS ==========================

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
  const tokenFromCookie = req.cookies.get(sessionKey)?.value;
  if (tokenFromCookie) return tokenFromCookie;

  const authHeader = req.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return undefined;
}

function cookieOptions() {
  return {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    httpOnly: true,
  };
}

function setTokenCookie(
  response: NextResponse,
  sessionKey: string,
  token: string
) {
  response.cookies.set(sessionKey, token, cookieOptions());
}

function deleteTokenCookie(response: NextResponse, sessionKey: string) {
  response.cookies.delete(sessionKey);
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
    const { payload } = await jwtVerify(token, enc, { algorithms: ["HS256"] });
    return (payload.user as Record<string, unknown>) || null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

function unauthorizedResponse() {
  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function unauthorizedResponseTokenAPI() {
  return new NextResponse(
    JSON.stringify({ error: "Unauthorized token on API" }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function unauthorizedResponseTokenPAGE() {
  return new NextResponse(JSON.stringify({ error: "Unauthorized on page" }), {
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

function unauthorizedResponseAPIUserValidate(req: NextRequest) {
  return setCorsHeaders(
    NextResponse.redirect(new URL("/waiting-room", req.url))
  );
  // return new NextResponse(
  //   JSON.stringify({ error: "Unauthorized api user validate" }),
  //   {
  //     status: 401,
  //     headers: { "Content-Type": "application/json" },
  //   }
  // );
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

function unauthorizedResponseUserNotAdmin(req: NextRequest) {
  return setCorsHeaders(NextResponse.redirect(new URL("/dev/home", req.url)));
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
    deleteTokenCookie(response, sessionKey);
    return setCorsHeaders(response);
  }

  console.error("Error logging out user:", await userLogout.json());
  return setCorsHeaders(
    NextResponse.redirect(new URL("/invalid-user", req.url))
  );
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|manifest).*)"],
};
