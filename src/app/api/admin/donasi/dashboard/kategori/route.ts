import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const method = request.method;
    if (method !== 'GET') {
        return NextResponse.json({
            success: false,
            message: 'Method not allowed',
        },
            { status: 405 }
        )
    }

    try {
        let fixData;
        fixData = await prisma.donasiMaster_Kategori.count({});
        return NextResponse.json({
            success: true,
            message: 'Success get data donasi dashboard',
            data: fixData
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error('Error get data donasi dashboard >>', error);
        return NextResponse.json({
            success: false,
            message: 'Error get data donasi dashboard',
            reason: (error as Error).message
        },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect();
    }
}