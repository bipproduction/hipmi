import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { RouterAdminColab } from "@/lib/router_admin/router_admin_colab";

export async function GET(req: Request, { params }: { params: { id: string, report: string } }) {
    try {
        const { id } = params
        const userLoginId = await funGetUserIdByToken();
        const data = await prisma.projectCollaboration.update({
            where: {
                id: params.id
            },
            data: {
                isActive: false,
                isReject: true,
                report: params.report
            },
            select: {
                userId: true,
            }
        })
        if (!data) return { status: 400, message: "Gagal update project" };

        const updateReport = await prisma.projectCollaboration_Notifikasi.create({
            data: {
                projectCollaborationId: params.id,
                adminId: userLoginId as string,
                userId: data.userId as any,
                note: "Project Anda Telah Direport Admin",
            },
        });

        if (!updateReport) return { status: 400, message: "Gagal update notifikasi" };

        revalidatePath(RouterAdminColab.table_publish);

        return NextResponse.json({
            success: true,
            message: "Project berhasil direport",
            data: updateReport,
        },
            { status: 200 }
        )
    } catch (error) {
        backendLogger.error("Error get data collaboration report >>", error);
        return NextResponse.json({
            success: false,
            message: "Error get data collaboration report",
            reason: (error as Error).message
        },
            { status: 500 }
        )
    }
}