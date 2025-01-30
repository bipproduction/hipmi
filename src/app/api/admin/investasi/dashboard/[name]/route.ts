import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const data = await prisma.investasi.count({
            where: {
                active: true
            },
        })
        return NextResponse.json({
            message: "Data Investasi",
            data: data,
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error Get Count Investasi Main Dashboard")
        return NextResponse.json({
            message: "Error Get Count Investasi Main Dashboard",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect();
    }
}
