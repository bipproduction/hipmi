import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { name: string } }) {
    
    const { name } = params;
    try {
        let fixData;
        const fixStatus = _.startCase(name);
        fixData = await prisma.investasi.count({
            where: {
                MasterStatusInvestasi: {
                    name: fixStatus
                },
            }
        })
        return NextResponse.json({
            success: true,
            message: "Success get data investasi dashboard",
            data: fixData,
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data investasi dashboard >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get data investasi dashboard",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}
