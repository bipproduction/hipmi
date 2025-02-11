import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const method = request.method;
    try {
        const data = await prisma.donasiMaster_Kategori.findMany({
            orderBy: {
                createdAt: 'asc'
            },
            where: {

                active: true

            }

        })
        return NextResponse.json({
            success: true,
            message: "Success get kategori",
            data: data
        })
    } catch (error) {
        backendLogger.error("Error get kategori", error);
        return NextResponse.json({
            success: false,
            message: "Failed get kategori",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}