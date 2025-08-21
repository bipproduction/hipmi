import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    try {
        const cookiesKey = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!
        const cookieStore = cookies();
        const hipmiKey = cookieStore.get(cookiesKey)?.value || '';
        return NextResponse.json({ token: hipmiKey }); 
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}