import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {

    try {
        const { id } = params;
        const donasiId = id;
        const data = await prisma.donasi.findUnique({
            where: {
                id: donasiId,
            },
            select: {
                id: true,
                title: true,
                target: true,
                active: true,
                createdAt: true,
                updatedAt: true,
                publishTime: true,
                catatan: true,
                progres: true,
                terkumpul: true,
                authorId: true,
                namaBank: true,
                rekening: true,
                totalPencairan: true,
                akumulasiPencairan: true,
                imagesId: true,
                donasiMaster_KategoriId: true,
                donasiMaster_DurasiId: true,
                donasiMaster_StatusDonasiId: true,
                Author: true,
                imageDonasi: true,
                CeritaDonasi: true,
                DonasiMaster_Ketegori: true,
                DonasiMaster_Durasi: true,
                DonasiMaster_Status: true,
                imageId: true,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Data Donasi Berhasil Diambil",
            data: data,
        }, { status: 200 });
    } catch (error) {
        backendLogger.error("Error Get Data Donasi >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get detail Investasi",
            reason: (error as Error).message,
        }, { status: 500 });
    }
}