import { funGetDirectoryNameByValue } from "@/app_modules/_global/fun/get";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const dirId = formData.get("dirId");

  const keyOfDirectory = await funGetDirectoryNameByValue({
    value: dirId as string,
  });

  try {
    const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.WS_APIKEY}`,
      },
    });

    const dataRes = await res.json();

    if (res.ok) {
      return NextResponse.json(
        {
          success: true,
          data: dataRes.data,
          message: "Success upload file " + keyOfDirectory,
        },
        { status: 200 }
      );
    } else {
      const errorText = await res.text();
      console.log(`Failed upload ${keyOfDirectory}: ${errorText}`);
      return NextResponse.json(
        { success: false, message: errorText },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error upload >>", (error as Error).message || error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed upload file",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}
