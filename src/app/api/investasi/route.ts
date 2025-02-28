import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request) {
  try {
    return NextResponse.json({
      success: true,
      message: "Get data invetsasi",
      data: "",
    });
  } catch (error) {
    backendLogger.error("Error get data investasi", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data from API ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
