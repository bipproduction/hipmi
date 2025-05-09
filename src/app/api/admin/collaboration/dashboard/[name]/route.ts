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
        
        if (fixStatus === "Publish") {
            fixData = await prisma.projectCollaboration.count({
              where: {
                isActive: true,
                isReject: false,
                Author: {
                  active: true,
                },
              },
            });

        } else if (fixStatus === "Reject") {
            fixData = await prisma.projectCollaboration.count({
                where: {
                    isReject: true,
                },
            });

        } else if (fixStatus === "Room") {
            fixData = await prisma.projectCollaboration_RoomChat.count({
                where: {
                    isActive: true,
                },
            });

        }
        return NextResponse.json({
            success: true,
            message: `Success Get Data ${fixStatus}`,
            data: fixData,

        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get count group chat", error);
        return NextResponse.json({
            success: false,
            message: "Error get data count group chat ",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}