import { job_getAllListPublish } from "@/app_modules/job/fun/get/get_all_publish";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(params: Request) {
  const { searchParams } = new URL(params.url);
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const data = await job_getAllListPublish({
    page: _.toNumber(page),
    search: search as string,
  });

  return NextResponse.json({ data });
}
