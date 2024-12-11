import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const WS_APIKEY = process.env.WS_APIKEY;
  console.log(WS_APIKEY);

  try {
    const formData = await request.formData();

    const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.WS_APIKEY}`,
      },
    });

    // if (res.ok) {
    //   console.log("Berhasil");
    //   const hasil = await res.json();
    //   return { success: true, data: hasil.data };
    // } else {
    //   const errorText = await res.text();
    //   return { success: false, data: {} };
    // }
  } catch (error) {
    console.log(error);
  }

  // try {
  //   const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       Authorization: `Bearer ${process.env.WS_APIKEY}`,
  //     },
  //   });

  // if (res.ok) {
  //   const hasil = await res.json();
  //   return { success: true, data: hasil.data };
  // } else {
  //   const errorText = await res.text();
  //   return { success: false, data: {} };
  // }
  // } catch (error) {
  //   console.error("Upload error:", error);
  //   return { success: false, data: {} };
  // }

  return NextResponse.json({ success: true });
}
