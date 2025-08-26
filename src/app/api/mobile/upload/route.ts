import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  console.log("Incoming Content-Type:", contentType);

  const formData = await request.formData();
  const file: any = formData.get("file");
  const dirId = formData.get("dirId");

  console.log("formData >>", formData);
  console.log("file >>", file);
  console.log("dirId >>", dirId);

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
      console.log(`Success upload ${dirId}: ${JSON.stringify(dataRes.data)}`);
      return NextResponse.json(
        { success: true, data: dataRes.data },
        { status: 200 }
      );
    } else {
      const errorText = await res.text();
      console.log(`Failed upload ${dirId}: ${errorText}`);
      return NextResponse.json(
        { success: false, message: errorText },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed upload file",
        data: error,
      },
      { status: 500 }
    );
  }
}
