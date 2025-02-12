import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {
    params: { name: string }
}) {
    
    const { name } = params;
    try {
        let fixData;
        const fixStatus = _.startCase(name);
        fixData = await prisma.voting.count({
            where: {
                Voting_Status: {
                    name: fixStatus
                },
                isArsip: false
            },
        })

        return NextResponse.json({
            success: true,
            message: "Success get data voting dashboard",
            data: fixData
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data voting dashboard >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get data voting dashboard",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}