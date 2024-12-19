import { funGetDirectoryNameByValue } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const data = await req.json();
  const id = data.fileId;
  const dirId = data.dirId;

  const keyOfDirectory = await funGetDirectoryNameByValue({
    value: dirId,
  });

  if (req.method === "DELETE") {
    try {
      const res = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`,
          },
        }
      );
      backendLogger.info("Server status code: " + res.status);
      const data = await res.json();
      if (res.ok) {
        backendLogger.info(
          `Success delete ${keyOfDirectory}`
        );
        return NextResponse.json({ success: true });
      } else {
        const errorText = await res.json();
        backendLogger.error(
          `Failed delete ${keyOfDirectory}: ` + errorText.message
        );
        return NextResponse.json({
          success: false,
          message: errorText.message,
        });
      }
    } catch (error) {
      backendLogger.error(`Delete error ${keyOfDirectory}:`, error);
      return NextResponse.json({
        success: false,
        message: "An unexpected error occurred",
      });
    }
  } else {
    backendLogger.error(`Error upload ${keyOfDirectory}: Method not allowed`);
    return NextResponse.json({ success: false, message: "Method not allowed" });
  }
}
