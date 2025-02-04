import { prisma } from "@/app/lib";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {
    params: { status: string }
}
) {
    const method = request.method;
    if (method !== "GET") {
        return NextResponse.json({
            success: false,
            message: "Method not allowed",
        },
            { status: 405 }
        )
    }

    const { status } = params;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const takeData = 10
    const skipData = Number(page) * takeData - takeData;

    console.log("Ini Status", status);
    console.log("Ini Page", page)

    try {
        let fixData;
        const fixStatus = _.startCase(status);

        if (!page && !search) {
            fixData = await prisma.investasi.findMany({
                orderBy: {
                    updatedAt: "desc",
                },
                where: {
                    active: true,
                    MasterStatusInvestasi: {
                        name: fixStatus
                    },
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            Profile: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    MasterStatusInvestasi: true,
                },
            });
        } else if (!page && search) {
            fixData = await prisma.investasi.findMany({
                orderBy: {
                    updatedAt: "desc",
                },
                where: {
                    active: true,
                    MasterStatusInvestasi: {
                        name: fixStatus
                    },
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            Profile: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    MasterStatusInvestasi: true,
                },
            });
        } else if (page && !search) {

            const data = await prisma.investasi.findMany({
                take: takeData,
                skip: skipData,
                orderBy: [
                    {
                        countDown: "desc",
                    },
                ],
                where: {
                    active: true,
                    MasterStatusInvestasi: {
                        name: fixStatus
                    }

                },
                include: {
                    MasterStatusInvestasi: true,
                    BeritaInvestasi: true,
                    DokumenInvestasi: true,
                    ProspektusInvestasi: true,
                    MasterPembagianDeviden: true,
                    MasterPencarianInvestor: true,
                    MasterPeriodeDeviden: true,
                    author: true,
                    Investasi_Invoice: {
                        where: {
                            statusInvoiceId: "2",
                        },
                    },
                },
            });

            const nCount = await prisma.investasi.count({
                where: {
                    active: true,
                    MasterStatusInvestasi: {
                        name: fixStatus
                    }

                },
            });

            console.log("data >", data)

            fixData = {
                data: data,
                nPage: _.ceil(nCount / takeData),
            };

        }

        return NextResponse.json({
            success: true,
            message: "Success",
            data: fixData,
        },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed",
            reason: (error as Error).message,
        },
            { status: 500 }
        )

    }


}