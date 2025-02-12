import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {
    params: { status: string }
}) {

    const { status } = params;
    try {
        let fixData;
        const fixStatus = _.startCase(status);
        fixData = await prisma.job.count({
            where: {
                MasterStatus: {
                    name: fixStatus,
                },
                isArsip: false,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Success get data job-vacancy dashboard",
            data: fixData
        },
            { status: 200 }
        );
    } catch (error) {
        backendLogger.error("Error get data job-vacancy dashboard", error);
        return NextResponse.json({
            success: false,
            message: "Error get data job-vacancy dashboard",
            reason: (error as Error).message,
        },
            { status: 500 }
        )
    } 
}