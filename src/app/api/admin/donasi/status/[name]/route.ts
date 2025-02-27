import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: { name: string } }) {

    const { name } = params;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    try {
        let fixData;
        const fixStatus = _.startCase(name);


        if (!page) {
            fixData = await prisma.donasi.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                where: {
                    DonasiMaster_Status: {
                        name: fixStatus,
                    },
                    active: true,
                    title: {
                        contains: search ? search : "",
                        mode: "insensitive",
                    },
                },
                select: {
                    id: true,
                    title: true,
                    target: true,
                    authorId: true,
                    terkumpul: true,
                    imageDonasi: true,
                    DonasiMaster_Ketegori: true,
                    DonasiMaster_Durasi: true,
                    Author: {
                      select: {
                        id: true,
                        username: true,
                      },
                    },
                  },
            })
        } else {
            const data = await prisma.donasi.findMany({
                take: takeData,
                skip: skipData,
                orderBy: {
                    createdAt: "desc",
                },
                where: {
                    DonasiMaster_Status: {
                        name: fixStatus,
                    },
                    active: true,
                    title: {
                        contains: search ? search : "",
                        mode: "insensitive",
                    },
                },
                select: {
                    id: true,
                    title: true,
                    target: true,
                    authorId: true,
                    terkumpul: true,
                    imageDonasi: true,
                    DonasiMaster_Ketegori: true,
                    DonasiMaster_Durasi: true,
                    Author: {
                      select: {
                        id: true,
                        username: true,
                      },
                    },
                  },
            })

            const nCount = await prisma.donasi.count({
                where: {
                    active: true,
                    DonasiMaster_Status: {
                        name: fixStatus
                    },
                }
            })


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
    }
}