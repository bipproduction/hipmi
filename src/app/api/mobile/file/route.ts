import { funGetDirectoryNameByValue } from "@/app_modules/_global/fun/get";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const dirId = formData.get("dirId");
    const file = formData.get("file") as File | null;

    // === LOGGING: Request Details ===
    console.log("=== UPLOAD REQUEST START ===");
    console.log("dirId:", dirId);
    console.log("File details:");
    console.log("  - Name:", file?.name);
    console.log("  - Type:", file?.type);
    console.log("  - Size:", file?.size, "bytes");
    console.log("  - Size (KB):", file ? (file.size / 1024).toFixed(2) : "N/A");
    console.log("===========================");

    // FIX: Override MIME type jika salah (mobile app kadang kirim image/pdf)
    let fixedFile = file;
    if (file) {
      const fileName = file.name.toLowerCase();
      const originalType = file.type.toLowerCase();
      
      // Jika file PDF tapi type bukan application/pdf, fix it
      if (fileName.endsWith(".pdf") && originalType !== "application/pdf") {
        console.log("⚠️ WARNING: PDF file has wrong MIME type:", originalType);
        console.log("🔧 Overriding to: application/pdf");
        
        // Create new File with correct MIME type
        const buffer = await file.arrayBuffer();
        fixedFile = new File([buffer], file.name, {
          type: "application/pdf",
          lastModified: file.lastModified,
        });
        
        // Rebuild formData with fixed file
        formData.set("file", fixedFile);
      }
    }

    const keyOfDirectory = await funGetDirectoryNameByValue({
      value: dirId as string,
    });

    console.log("Directory key:", keyOfDirectory);

    const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.WS_APIKEY}`,
      },
    });

    // === LOGGING: Response Details ===
    console.log("=== EXTERNAL STORAGE RESPONSE ===");
    console.log("Status:", res.status);
    console.log("Status Text:", res.statusText);
    console.log("Content-Type:", res.headers.get("content-type"));
    console.log("=================================");

    // Cek content-type sebelum parse JSON
    const contentType = res.headers.get("content-type") || "";
    let dataRes;

    // Try parse JSON untuk semua response (beberapa server salah set content-type)
    try {
      const rawResponse = await res.text();
      
      // Coba parse sebagai JSON
      try {
        dataRes = JSON.parse(rawResponse);
        console.log("✅ Successfully parsed response as JSON");
      } catch {
        // Bukan JSON - gunakan raw text
        console.log("⚠️ Response is not JSON, using raw text");
        
        if (res.ok) {
          // Success tapi bukan JSON - return success response
          return NextResponse.json(
            { 
              success: true,
              message: "Success upload file " + keyOfDirectory,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { 
              success: false, 
              message: "Upload failed",
              error: rawResponse.substring(0, 500),
              fileDetails: {
                name: file?.name,
                type: file?.type,
                size: file?.size,
              }
            },
            { status: res.status || 400 }
          );
        }
      }
    } catch (readError) {
      console.log("❌ Failed to read response body");
      console.log("Read error:", (readError as Error).message);
      
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to read response",
          reason: (readError as Error).message,
        },
        { status: 500 }
      );
    }

    if (res.ok) {
      console.log("✅ Upload SUCCESS");
      return NextResponse.json(
        {
          success: true,
          data: dataRes.data,
          message: "Success upload file " + keyOfDirectory,
        },
        { status: 200 }
      );
    } else {
      console.log("❌ Upload FAILED");
      console.log("Response:", dataRes);
      
      const errorMessage = dataRes.message || dataRes.error || JSON.stringify(dataRes);
      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage || "Upload failed",
          fileDetails: {
            name: file?.name,
            type: file?.type,
            size: file?.size,
          }
        },
        { status: res.status || 400 }
      );
    }
  } catch (error) {
    console.log("=== CATCH ERROR ===");
    console.log("Error:", (error as Error).message);
    console.log("Stack:", (error as Error).stack);
    console.log("===================");
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed upload file",
        reason: (error as Error).message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
