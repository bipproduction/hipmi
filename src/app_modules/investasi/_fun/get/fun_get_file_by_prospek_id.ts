"use server"

import prisma from "@/lib/prisma"

export async function investasi_funGetProspekById({prospekId}: {prospekId: string}) {
    const data = await prisma.prospektusInvestasi.findFirst({
        where: {
            id: prospekId
        }
    })

    return data
}