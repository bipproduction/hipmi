import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
export async function GET(req: Request,
    { params }: { params: { id: string } }) {
    try {
        let fixData;
        const { id } = params
        const data = await prisma.investasi_Invoice.findUnique({
            where: {
                id: id
            },
            include: {
                Author: true,
                Images: true,
                StatusInvoice: true,
                MasterBank: true,
            }
        })
        
        fixData = {
            data: data,
        }
        return NextResponse.json({
            success: true,
            message: "Success get data detail transaksi",
            data: fixData,
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data detail transaksi", error);
        return NextResponse.json({
            success: false,
            message: "Error get data detail transaksi",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}