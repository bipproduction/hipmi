import prisma from "@/app/lib/prisma";
import userRole from "../../../bin/seeder/user_role.json";
import { NextResponse } from "next/server";
import { MyConsole } from "@/app_modules/fun";

export async function GET(req: Request) {
  const dev = new URL(req.url).searchParams.get("dev");
  if (dev === "DEV-HIPMI") {
    for (let i of userRole) {
      const data = await prisma.masterUserRole.upsert({
        where: {
          id: i.id.toString(),
        },
        update: {
          id: i.id.toString(),
          name: i.name,
        },
        create: {
          id: i.id.toString(),
          name: i.name,
        },
      });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
}
