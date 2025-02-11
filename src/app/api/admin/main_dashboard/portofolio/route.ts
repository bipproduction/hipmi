import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const data = await prisma.portofolio.count({
            where: {
                active: true
            }
        });
        return NextResponse.json({
            success: true,
            message: "Data portofolio",
            data: data
        },
            { status: 200 }
        );
    } catch (error) {
        backendLogger.error("Error Get Count Portofolio Main Dashboard")
        return NextResponse.json({
            success: false,
            message: "Error Get Count Portofolio Main Dashboard",
            data: null
        },
            { status: 500 }
        );
    } 
}