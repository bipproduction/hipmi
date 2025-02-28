import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    { params }: { params: { id: string } }) {

    try {
        let fixData;
        const { id } = params;
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page");
        const status = searchParams.get("status");
        const takeData = 10
        const skipData = Number(page) * takeData - takeData;

        if (!page) {
            fixData = await prisma.donasi_Invoice.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                where: {
                    donasiId: id,
                    active: true,
                },
                select: {
                    id: true,
                    nominal: true,
                    createdAt: true,
                    Author: true,
                    DonasiMaster_Bank: true,
                    DonasiMaster_StatusInvoice: true,
                    donasiMaster_StatusInvoiceId: true,
                    imagesId: true,
                    imageId: true,
                    
                },
            })
        } else {
            const fixStatus = _.startCase(status ? status : "");
            const data = await prisma.donasi_Invoice.findMany({
                take: takeData,
                skip: skipData,
                orderBy: {
                    createdAt: "desc",
                },
                where: {
                    
                    donasiId: id,
                    active: true,
                    DonasiMaster_StatusInvoice: {
                        name: {
                            contains: fixStatus,
                            mode: "insensitive",
                        }
                    }
                },
                select: {
                    id: true,
                    nominal: true,
                    createdAt: true,
                    Author: true,
                    DonasiMaster_Bank: true,
                    DonasiMaster_StatusInvoice: true,
                    donasiMaster_StatusInvoiceId: true,
                    imagesId: true,
                    imageId: true,
                    
                    
                },
            })

            const nCount = await prisma.donasi_Invoice.count({
                where: {
                    donasiId: id,
                    active: true,
                    DonasiMaster_StatusInvoice: {
                        name: {
                            contains: fixStatus,
                            mode: "insensitive",
                        }
                    }
                }
            })

            fixData = {
                data: data,
                nPage: _.ceil(nCount / takeData)
            }
        }

        return NextResponse.json({
            success: true,
            message: "Success",
            data: fixData,
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data donatur >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get data donatur",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}

