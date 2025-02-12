import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: { id: string } }) {

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;


    try {
        let fixData;
        const { id } = params;
        const eventId = id

        if (!page) {
            fixData = await prisma.event_Peserta.findMany({
            
                where: {
                    eventId: eventId,
                    User: {
                        username: {
                            contains: search ? search : "",
                        }
                    }

                },
                select: {
                    isPresent: true,
                    User: {
                        include: {
                            Profile: true,
                        },
                    },
                },
            });
        } else {
            const data = await prisma.event_Peserta.findMany({
                skip: skipData,
                take: takeData,
                where: {
                    eventId: eventId,
                    User: {
                        username: {
                            contains: search ? search : "",
                        }
                    }
                },
                select: {
                    isPresent: true,
                    User: {
                        include: {
                            Profile: true,
                        },
                    },
                },
            });

            const nCount = await prisma.event_Peserta.count({
                where: {
                    eventId: eventId,
                },
            });

            fixData = {
                data: data,
                nPage: _.ceil(nCount / takeData),
            };
        }
        return NextResponse.json({
            success: true,
            message: "Success get data event detail",
            data: fixData,
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data event detail >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get data event detail",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}