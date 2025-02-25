import { NextResponse } from "next/server";
import packageVersion from "../../../../package.json";

export async function GET(request: Request) {

const version = packageVersion.version

  return NextResponse.json(
    {
      success: true,
      message: "Success get version",
      data: version,
    },
    { status: 200 }
  );
}
