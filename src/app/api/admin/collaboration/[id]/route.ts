import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await prisma.projectCollaboration.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                isActive: true,
                title: true,
                lokasi: true,
                purpose: true,
                benefit: true,
                createdAt: true,
                Author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                ProjectCollaborationMaster_Industri: true,
                ProjectCollaboration_Partisipasi: {
                    where: {
                        User: {
                            active: true,
                        },
                    },
                    select: {
                        id: true,
                        User: {
                            select: {
                                id: true,
                                Profile: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return NextResponse.json({
            success: true,
            message: "Success get collaboration",
            data: data
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get collaboration >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get collaboration",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}