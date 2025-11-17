import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { number } = body;

    if (!number) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields.",
      });
    }

    const data = await resend.emails.send({
      from: `+${number} <onboarding@resend.dev>`,
      to: ["bagasbanuna02@gmail.com"], // ganti sesuai email kamu
      //   cc: ["bip.baliinteraktifperkasa@gmail.com"],
      subject: "Delete Account",
      html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <h3>New Message to Delete Account</h3>
            <p><strong>User with phone number +${number}</strong></p>
            <p><strong>Description: Want to delete account !!</strong></p>
          </div>
        `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
