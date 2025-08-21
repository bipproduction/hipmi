"use server"

import prisma from "@/lib/prisma"

export async function AdminEvent_getListTipeAcara(){
    const data = await prisma.eventMaster_TipeAcara.findMany({
        orderBy:{
            id: "asc"
        },
        where: {
            active: true
        }
    })
    return data
}