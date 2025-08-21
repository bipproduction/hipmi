import { event_funCheckKehadiran } from "@/app_modules/event/fun";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const eventId = searchParams.get("eventId");

  const res = await event_funCheckKehadiran({
    eventId: eventId as string,
    userId: userId as string,
  });

  return NextResponse.json(res, { status: 200 });
}
