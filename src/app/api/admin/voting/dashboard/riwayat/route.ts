import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const method = request.method;
    if (method !== "GET") {
        return NextResponse.json({
            success: false,
            message: "Method not allowed",
        },
            { status: 405 }
        )
    }
    try {
        let fixData;
        fixData = await prisma.voting.count({
            where: {
                Voting_Status: {
                    name: "Publish",
                },
                isArsip: true,
            }
        })
        return NextResponse.json({
            success: true,
            message: 'Success get data voting dashboard',
            data: fixData
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error('Error get data voting dashboard >>', error);
        NextResponse.json({
            success: false,
            message: 'Error get data voting dashboard',
            reason: (error as Error).message
        },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect();
    }
}