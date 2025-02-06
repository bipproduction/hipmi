import { prisma } from "@/app/lib";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: { status: string } }
) {
    const method = request.method;
    if (method !== "GET") {
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
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    try {
        let fixData;
        const fixStatus = _.startCase(status);

        if (!page && !search) {
            fixData = await prisma.voting.findMany({
                orderBy: {
                    updatedAt: "desc"
                },
                where: {
                    isActive: true,
                    isArsip: false,
                    Voting_Status: {
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
                    Voting_Status: true,
                    Voting_Kontributor: true,
                    Voting_DaftarNamaVote: true,
                }
            })
        } else if (!page && search) {
            fixData = await prisma.voting.findMany({
                orderBy: {
                    updatedAt: "desc"
                },
                where: {
                    isActive: true,
                    isArsip: false,
                    Voting_Status: {
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
                    Voting_Status: true,
                    Voting_Kontributor: true,
                    Voting_DaftarNamaVote: true,
                }
            })
        } else if (page && !search) {
            if (fixStatus === "Publish") {
                const getAllData = await prisma.voting.findMany({
                    where: {
                        isActive: true,
                        Voting_Status: {
                            name: fixStatus
                        },
                        isArsip: false
                    }
                });

            }
        }
    } catch (error) {

    }
}