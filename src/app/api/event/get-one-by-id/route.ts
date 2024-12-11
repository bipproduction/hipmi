import { event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import { NextResponse } from "next/server";

export async function GET(params: Request) {
  const { searchParams } = new URL(params.url);
  const eventId = searchParams.get("eventId");

  const res = await event_getOneById(eventId as string);

  if (!res) {
    return NextResponse.json(
      { message: "Event Not Found", data: null },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Event Found", data: res },
    { status: 200 }
  );
}
