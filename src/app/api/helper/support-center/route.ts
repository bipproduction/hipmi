import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { email, title, description } = body;

    if (!email || !title || !description) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields.",
      });
    }

    const data = await resend.emails.send({
      from: `${email} <onboarding@resend.dev>`,
      to: ["bip.baliinteraktifperkasa@gmail.com"], // ganti sesuai email kamu
      subject: title,
      html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <h3>New Message Received</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Description:</strong><br/>${description.replace(/\n/g, "<br/>")}</p>
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
