import { prisma } from "@/lib";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {
    params: { name: string }
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

    const { name } = params;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const takeData = 10
    const skipData = Number(page) * takeData - takeData;

    try {
        let fixData;
        const fixStatus = _.startCase(name);


        if (!page) {
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
                        contains: search ? search : "",
                        mode: "insensitive"
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
        } else {
            const data = await prisma.investasi.findMany({
                take: takeData,
                skip: skipData,
                orderBy: {
                    updatedAt: "desc",
                },
                where: {
                    active: true,
                    MasterStatusInvestasi: {
                        name: fixStatus
                    },
                    title: {
                        contains: search ? search : "",
                        mode: "insensitive"
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