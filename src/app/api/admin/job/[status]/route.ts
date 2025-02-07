import { Job_Status } from '@/app_modules/job';
import { prisma } from "@/app/lib";
import _, { take } from "lodash";
import { NextResponse } from "next/server";
import backendLogger from '@/util/backendLogger';
import moment from 'moment';

export async function GET(request: Request, { params }: {
    params: { status: string }
}
) {
    const method = request.method;
    if (method !== 'GET') {
        return NextResponse.json({
            success: false,
            message: "Method not allowed"
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


    try {
        let fixData;
        const fixStatus = _.startCase(status);

        if (!page) {
            fixData = await prisma.job.findMany({
                orderBy: {
                    updatedAt: "desc"
                },
                where: {
                    isActive: true,
                    isArsip: false,
                    MasterStatus: {
                        name: fixStatus
                    },
                    title: {
                        contains: search ? search : "",
                        mode: "insensitive"
                    }

                },
                include: {
                    Author: true,
                },

            })
        } else {
            fixData = await prisma.job.findMany({
                take: takeData,
                skip: skipData,
                orderBy: {
                    updatedAt: "desc"
                },
                where: {
                    isActive: true,
                    isArsip: false,
                    MasterStatus: {
                        name: fixStatus
                    },
                    title: {
                        contains: search ? search : "",
                        mode: "insensitive"
                    }
                },
                include: {
                    Author: true,
                },
            })

            const nCount = await prisma.job.count({
                where: {
                    isActive: true,
                    isArsip: false,
                    title: {
                        contains: search ? search : "",
                        mode: "insensitive"
                    }
                }
            })

            fixData = {
                data: fixData,
                nPage: _.ceil(nCount / takeData)
            }   
        }
        return NextResponse.json({
            success: true,
            message: "Data found",
            data: fixData,

        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Eror get data", error)
        return NextResponse.json({
            success: false,
            message: "Data not found",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}