
import { decrypt } from "@/app/auth/_lib/decrypt";
import _ from "lodash";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const c = cookies().get(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);

  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  const token = c.value;
  const dataUser = await decrypt({
    token: token,
    encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  });

  const id = dataUser?.id

  return NextResponse.json({ status: 200, message: "OK", data: id });
}
