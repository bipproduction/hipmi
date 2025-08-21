import _ from "lodash";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cekCookies = cookies();
  const c = cekCookies.get("mySession");

  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
    return NextResponse.json({ success: false });
  
  }
  return NextResponse.json({ success: true });
}
