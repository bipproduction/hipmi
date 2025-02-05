import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { data } from "autoprefixer";
import _, { take } from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: { status: string } }) {
    const method = request.method;
    if (method !== "GET") {
        return NextResponse.json({
            succes: false,
            message: "Method not allowed"
        },
            { status: 405 }
        );
    }

    const { status } = params;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    try {
        let fixData;
        const fixStatus = _.startCase(status);
        

        if (!page && !search) {
            fixData = await prisma.donasi.findMany({
                orderBy: {
                    updatedAt: "desc",
                },
                where: {
                    active: true,
                    DonasiMaster_Status: {
                        name: fixStatus
                    }
                },
                include: {
                    Author: {
                        select: {
                            id: true,
                            username: true,
                            Profile: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    DonasiMaster_Status: true,
                    DonasiMaster_Ketegori: true,
                    DonasiMaster_Durasi: true
                }
            })
        } else if (!page && search) {
            fixData = await prisma.donasi.findMany({
                orderBy: {
                    updatedAt: "desc"
                },
                where: {
                    active: true,
                    DonasiMaster_Status: {
                        name: fixStatus
                    },
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                include: {
                    Author: {
                        select: {
                            id: true,
                            username: true,
                            Profile: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    DonasiMaster_Status: true,
                    DonasiMaster_Ketegori: true,
                    DonasiMaster_Durasi: true
                }
            })
        } else if (page && !search) {
            const data = await prisma.donasi.findMany({
                take: takeData,
                skip: skipData,
                orderBy: [
                    {
                        publishTime: "desc"
                    }
                ],
                where: {
                    active: true,
                    DonasiMaster_Status: {
                        name: fixStatus
                    }
                },
                include: {
                    Author: true,
                    imageDonasi: true,
                    DonasiMaster_Status: true,
                    DonasiMaster_Ketegori: true,
                    DonasiMaster_Durasi: true
                }
            })

            const nCount = await prisma.donasi.count({
                where: {
                    active: true,
                    DonasiMaster_Status: {
                        name: fixStatus
                    },
                }
            })

            console.log("data >", data)
            fixData = {
                data: data,
                nCount: _.ceil(nCount / takeData)
            }
        }

        return NextResponse.json({
            success: true,
            message: "Success",
            data: fixData
        },
            { status: 200 }
        )

    } catch (error) {
        backendLogger.error("Error geta data table donasi event dashboard>>", error)
        return NextResponse.json({
            success: false,
            message: "Failed get data table donasi dashboard",
            reason: (error as Error).message
        },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}