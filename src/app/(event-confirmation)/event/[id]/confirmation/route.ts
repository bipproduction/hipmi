/**
 * Route Handler untuk Deep Link Event Confirmation
 * File: app/event/[id]/confirmation/route.ts
 * Deskripsi: Handle GET request untuk deep link event confirmation dengan redirect ke mobile app
 * Pembuat: Assistant
 * Tanggal: 9 Maret 2026
 */

import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";

/**
 * Detect platform dari User Agent string
 * @param userAgent - User Agent string dari request
 * @returns Platform type: 'ios', 'android', atau 'web'
 */
function detectPlatform(userAgent: string | null): "ios" | "android" | "web" {
  if (!userAgent) {
    return "web";
  }

  const lowerUA = userAgent.toLowerCase();

  // Detect iOS devices
  if (
    /iphone|ipad|ipod/.test(lowerUA) ||
    (lowerUA.includes("mac") && (("ontouchend" in {}) as any))
  ) {
    return "ios";
  }

  // Detect Android devices
  if (/android/.test(lowerUA)) {
    return "android";
  }

  // Default to web
  return "web";
}

/**
 * Build custom scheme URL untuk mobile app
 * @param eventId - Event ID dari URL
 * @param userId - User ID dari query parameter
 * @param platform - Platform yang terdetect
 * @returns Custom scheme URL
 */
function buildCustomSchemeUrl(
  eventId: string,
  userId: string | null,
  platform: "ios" | "android" | "web",
): string {
  const baseUrl = "hipmimobile://event";
  const url = `${baseUrl}/${eventId}/confirmation${userId ? `?userId=${userId}` : ""}`;
  return url;
}

/**
 * Get base URL dari environment
 */
function getBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_ENV || "development";

  if (env === "production") {
    return "https://hipmi.muku.id";
  }

  if (env === "staging") {
    return "https://cld-dkr-hipmi-stg.wibudev.com";
  }

  return "http://localhost:3000";
}

/**
 * Handle GET request untuk deep link
 * @param request - Next.js request object
 * @returns Redirect ke mobile app atau JSON response untuk debugging
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const eventId = params.id;
    const userId = searchParams.get("userId") || null;
    const userAgent = request.headers.get("user-agent") || "";

    // Detect platform
    const platform = detectPlatform(userAgent);

    // Log untuk tracking
    console.log("[Deep Link] Event Confirmation Received:", {
      eventId,
      userId,
      platform,
      userAgent:
        userAgent.substring(0, 100) + (userAgent.length > 100 ? "..." : ""),
      timestamp: new Date().toISOString(),
      url: request.url,
    });

    // Build custom scheme URL untuk redirect
    const customSchemeUrl = buildCustomSchemeUrl(eventId, userId, platform);

    // Redirect ke mobile app untuk iOS dan Android
    if (platform === "ios" || platform === "android") {
      console.log("[Deep Link] Redirecting to mobile app:", customSchemeUrl);

      // Redirect ke custom scheme URL
      return NextResponse.redirect(customSchemeUrl);
    }

    console.log("[Deep Link] Environment:", process.env.NEXT_PUBLIC_ENV);
    console.log("[Deep Link] Base URL:", getBaseUrl());
    console.log("[Deep Link] Request:", {
      eventId,
      userId,
      platform,
      url: request.url,
      timestamp: new Date().toISOString(),
    });

    // Untuk web/desktop, tampilkan JSON response untuk debugging
    const responseData = {
      success: true,
      message: "Deep link received - Web fallback",
      data: {
        eventId,
        userId,
        platform,
        userAgent,
        timestamp: new Date().toISOString(),
        url: request.url,
        customSchemeUrl,
        note: "This is a web fallback. Mobile users will be redirected to the app.",
      },
    };

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("[Deep Link] Error processing request:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error processing deep link",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

/**
 * Handle OPTIONS request untuk CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}
