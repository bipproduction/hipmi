"use server"

import prisma from "@/lib/prisma"

export default async function getMaster_StatusTransaksiInvestasi() {
    const data = await prisma.masterStatusTransaksiInvestasi.findMany()
    return data
}