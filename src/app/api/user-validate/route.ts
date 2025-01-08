import { decrypt } from "@/app/auth/_lib/decrypt";
import { prisma } from "@/app/lib";
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    const decripted = await decrypt({
        token: token!,
        encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!
    })

    if (!decripted) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decripted.id
        }
    })
    return NextResponse.json({
        success: true,
        message: "Berhasil mendapatkan data",
        data: user
    })
}