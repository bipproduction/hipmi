import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    { params }: { params: { id: string } }) {

    try {
        
    } catch (error) {
        backendLogger.error("Error get data event detail >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get data event detail",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}