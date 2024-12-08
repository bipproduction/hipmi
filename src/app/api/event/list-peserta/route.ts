import { event_newGetListPesertaById } from "@/app_modules/event/fun";
import { Event_getListPesertaById } from "@/app_modules/event/fun/get/get_list_peserta_by_id";
import { toNumber } from "lodash";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  const page = searchParams.get("page");
  
  const res = await event_newGetListPesertaById({
    eventId: eventId as string,
    page: toNumber(page),
  });

  return NextResponse.json(res, { status: 200 });
}
