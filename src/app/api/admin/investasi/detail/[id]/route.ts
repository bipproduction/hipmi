import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export  async function GET(req: Request,
    { params }: { params: { id: string } }) {

    console.log("Ini ID", params.id);

    try {
        const { id } = params;
        const data = await prisma.investasi.findUnique({
            where: {
                id: id,
            },
            select: {
                imageId: true,
                prospektusFileId: true,
                id: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        nomor: true,
                        Profile: true,
                    },
                },
                title: true,
                authorId: true,
                hargaLembar: true,
                targetDana: true,
                totalLembar: true,
                sisaLembar: true,
                lembarTerbeli: true,
                progress: true,
                roi: true,
                active: true,
                createdAt: true,
                updatedAt: true,
                catatan: true,
                imagesId: true,
                MasterStatusInvestasi: true,
                BeritaInvestasi: true,
                DokumenInvestasi: true,
                ProspektusInvestasi: true,
                MasterPembagianDeviden: true,
                MasterPencarianInvestor: true,
                MasterPeriodeDeviden: true,
                MasterProgresInvestasi: true,
                masterStatusInvestasiId: true,
                Investasi_Invoice: {
                    where: {
                        statusInvoiceId: "1",
                    },
                },
                countDown: true,

            },
        });

        return NextResponse.json({
            success: true,
            message: "Success get detail investasi",
            data: data,
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get detail investasi", error);
        return NextResponse.json({
            success: false,
            message: "Error get detail investasi",
            reason: (error as Error).message
        },
            { status: 500 }
        );

    }
}