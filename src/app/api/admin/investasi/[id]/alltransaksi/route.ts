import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET( request: Request,
    { params }: { params: { id: string,} }) {

        let fixData;
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page");
        const selectStatus = searchParams.get("status");
        const { id } = params;
        const investasiId = id;
        const takeData = 10;
        const skipData = Number(page) * takeData - takeData;
    try {

        if (!page) {
            fixData = await prisma.investasi_Invoice.findMany({
                orderBy: [
                    {
                        createdAt: "desc",
                    },
                ],
                where: {
                    investasiId: investasiId,
                    isActive: true,
                    statusInvoiceId: {
                        contains: selectStatus ? selectStatus : "",
                        mode: "insensitive",
                    },
                },
                include: {
                    Author: true,
                    Images: true,
                    StatusInvoice: true,
                    MasterBank: true,
                },
            });

        } else {
            const data = await prisma.investasi_Invoice.findMany({
                take: takeData,
                skip: skipData,
                orderBy: [
                    {
                        createdAt: "desc",
                    },
                ],
                where: {
                    investasiId: investasiId,
                    isActive: true,
                    statusInvoiceId: {
                        contains: selectStatus ? selectStatus : "",
                        mode: "insensitive",
                    },
                },
                include: {
                    Author: true,
                    Images: true,
                    StatusInvoice: true,
                    MasterBank: true,
                },
            });

            const nCount = await prisma.investasi_Invoice.count({
                where: {
                    investasiId: investasiId,
                    isActive: true,
                    statusInvoiceId: {
                        contains: selectStatus ? selectStatus : "",
                        mode: "insensitive",
                    },
                },
            });

            fixData = {
                data: data,
                nPage: _.ceil(nCount / takeData),
            }
        }
        
        return NextResponse.json({
            success: true,
            message: "Success get data all transaksi investasi dashboard",
            data: fixData,
        },
            { status: 200 }
        );
    } catch (error) {
        backendLogger.error("Error get data all transaksi investasi dashboard >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get data all transaksi investasi dashboard",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}