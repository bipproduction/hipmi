import { event_getListAllPublish } from "@/app_modules/event/fun/get/get_list_all_publish";
import { toNumber } from "lodash";
import { NextResponse } from "next/server";

export async function GET(params: Request) {
  const { searchParams } = new URL(params.url);
  const page = searchParams.get("page");

  const data = await event_getListAllPublish({ page: toNumber(page) });

  return NextResponse.json({ data });
}
