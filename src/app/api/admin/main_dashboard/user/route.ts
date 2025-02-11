import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const method = request.method;
    
    try {
        const data = await prisma.user.count({
            where: {
                active: true
            },


        })
        return NextResponse.json({
            success: true,
            message: "Data user",
            data: data
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error Get Count User Main Dashboard")
        return NextResponse.json({
            success: false,
            message: "Gagal mendapatkan data",
            reason: (error as Error).message
        },
            { status: 500 }
        )

    }

}