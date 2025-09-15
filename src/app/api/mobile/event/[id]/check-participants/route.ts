import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export {GET}

async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        let fixData

        const checkParticipant = await prisma.event_Peserta.findFirst({
          where: {
            userId: userId as any,
            eventId: id,
          },
        });

        if (checkParticipant !== null) {
          fixData = true;
        } else {
          fixData = false;
        }

        return NextResponse.json(
          {
            success: true,
            message: "Success get participants",
            data: fixData,
          },
          { status: 200 }
        );
        
    } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message: "Error get participants",
            reason: (error as Error).message,
          },
          { status: 500 }
        );
        
    }
    
}