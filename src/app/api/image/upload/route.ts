import { funGetDirectoryNameByValue } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const formData = await request.formData();

  const valueOfDir = formData.get("dirId");
  const keyOfDirectory = await funGetDirectoryNameByValue({
    value: valueOfDir as string,
  });

  if (request.method === "POST") {
    try {
      const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
        method: "POST",
        body: formData,
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
