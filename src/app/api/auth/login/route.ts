import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { sealData, unsealData } from "iron-session";
import { cookies } from "next/headers";
import { MyConsole } from "@/app_modules/fun";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    MyConsole(body);

    try {
      await fetch(
        `https://wa.wibudev.com/code?nom=${body.nomor}&text=${body.otp}`
      );
      return NextResponse.json({ body, success: true });
    } catch (error) {
      return NextResponse.json({ status: 500, message: "Server Error !!!" });
    }
  }
  return NextResponse.json({ success: false });
}
