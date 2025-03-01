import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const donasiId = params.id
    try {
        const data = await prisma.donasi_PencairanDana.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                donasiId: donasiId,
            }
        })
        
    } catch (error) {
        backendLogger.error("Error get pencairan donasi >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get pencairan donasi",
            reason: (error as Error).message
        })
    }
}