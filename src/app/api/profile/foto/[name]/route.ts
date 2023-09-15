import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    const fl = fs.readFileSync(`./public/img/${params.name}`)
    return new NextResponse(fl, {
        headers: {
            "Content-Type": "image/png"
        }
    })
}