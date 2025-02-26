"use server"

import prisma from "@/lib/prisma"

export default async function getTransaksiByIdInvestasi(id: string) {
    const data = await prisma.transaksiInvestasi.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            namaBank: true,
            nomorRekening: true,
            transaction_id: true,
            quantity: true,
            gross_amount: true,
            status_message: true,
            active: true,
            createdAt: true,
            updatedAt: true,
            Author: true,
            Investasi: true
        }
    })
    return data
    
}