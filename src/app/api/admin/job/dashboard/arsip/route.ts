import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const method = request.method;
    
    try {
        let fixData;
        fixData = await prisma.job.count({
            where: {
                MasterStatus: {
                    name: "Publish"
                },
                isArsip: true
            }
        })
        return NextResponse.json({
            success: true,
            message: "Success get data job-vacancy dashboard",
            data: fixData
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data job-vacancy dashboard", error);
        return NextResponse.json({
            success: false,
            message: "Error get data job-vacancy dashboard",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    } 
}