"use server"

import prisma from "@/lib/prisma"

export async function AdminDonasi_funUpdateCatatanReject(doansiId: string, catatan: string) {
    const updt = await prisma.donasi.update({
        where: {
            id: doansiId
        },
        data: {
            catatan: catatan
        }
    })

    if(!updt) return {status: 400, message: "Gagal update"}
    return {
        status: 200,
        message: "Berhasil update"
    }
}