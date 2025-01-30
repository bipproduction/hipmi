import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { data } from "autoprefixer";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {
    params: { name: string }
}) {
    const method = request.method;
    if (method !== "GET") {
        return NextResponse.json({
            success: false,
            message: "Method not allowed",
        },
            { status: 405 }
        );
    }

    const { name } = params;
    try {
        let fixData;
        const fixStatus = _.startCase(name);
        fixData = await prisma.donasi.count({
            where: {
                DonasiMaster_Status: {
                    name: fixStatus
                }
            }
        });
        return NextResponse.json({
            success: true,
            message: "Success get data donasi dashboard",
            data: fixData
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data donasi dashboard >>", error);
        return NextResponse.json({
            success: false,
            message: "Failed to get data donasi dashboard",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect();
    }
}