import { funGetDirectoryNameByValue } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import sharp from "sharp";
export async function POST(request: Request) {
  let fixFormData;
  const formData = await request.formData();
  const file: any = formData.get("file");
  const mimeType = file.type;
  console.log("MIME Type:", mimeType);

  const valueOfDir = formData.get("dirId");
  const keyOfDirectory = await funGetDirectoryNameByValue({
    value: valueOfDir as string,
  });

  if (request.method === "POST") {
    try {
      if (mimeType != "application/pdf") {
        // Resize ukuran
        const imageBuffer = await file.arrayBuffer();
        const resize = await sharp(imageBuffer).resize(2000).toBuffer();

        // Convert buffer ke Blob
        const blob = new Blob([resize], { type: file.type });

        // Convert Blob ke File
        const resizedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: new Date().getTime(),
        });

        // Buat FormData baru
        const newFormData = new FormData();
        newFormData.append("file", resizedFile);
        newFormData.append("dirId", formData.get("dirId") as string);

        fixFormData = newFormData;
      } else {
        fixFormData = formData;
      }

      const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
        method: "POST",
        body: fixFormData,
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      });

      backendLogger.info("Server status code: " + res.status);
      const dataRes = await res.json();

      if (res.ok) {
        backendLogger.info(
          `Success upload ${keyOfDirectory}: ${JSON.stringify(dataRes.data)}`
        );
        return NextResponse.json(
          { success: true, data: dataRes.data },
          { status: 200 }
        );
      } else {
        const errorText = await res.text();
        backendLogger.error(`Failed upload ${keyOfDirectory}: ${errorText}`);
        return NextResponse.json(
          { success: false, message: errorText },
          { status: 400 }
        );
      }
    } catch (error) {
      backendLogger.error(`Error upload ${keyOfDirectory}: ${error}`);
      return NextResponse.json(
        {
          success: false,
          message: "An unexpected error occurred",
        },
        { status: 500 }
      );
    }
  } else {
    backendLogger.error(`Error upload ${keyOfDirectory}: Method not allowed`);
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }
}
