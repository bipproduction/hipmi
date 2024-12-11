import { event_funCheckKehadiran } from "@/app_modules/event/fun";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const eventId = searchParams.get("eventId");

  const res = await event_funCheckKehadiran({
    eventId: eventId as string,
    userId: userId as string,
  });

  return NextResponse.json(res, { status: 200 });
}
