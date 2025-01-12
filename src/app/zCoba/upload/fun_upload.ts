"use server";

import _ from "lodash";
// import { v4 } from "uuid";
import fs from "fs";
import sharp from "sharp";

export default async function fun_upload({
  file,
  dirId,
}: {
  file: File;
  dirId: string;
}) {
  //   const file: any = formData.get("file");
  //   const fName = file.name;
  //   const fileSize = file.size;

  //   // Convert ke KB
  //   const fileSizeInKB = fileSize / 1024;

  //   // Convert ke MB
  //   const fileSizeInMB = fileSize / (1024 * 1024);

  //   console.log(`Ukuran file dalam bytes: ${fileSize}`);
  //   console.log(`Ukuran file dalam KB: ${fileSizeInKB.toFixed(2)} KB`);
  //   console.log(`Ukuran file dalam MB: ${fileSizeInMB.toFixed(2)} MB`);

  const imageBuffer = await file.arrayBuffer();
  const resize = await sharp(imageBuffer).resize(2000).toBuffer();

  const newFile = Buffer.from(resize);
  console.log("file new",newFile);
  //   fs.writeFileSync(`./public/upload/${fName}`, upFolder as any);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dirId", dirId);

  //     const upload = await fetch("/api/image/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const res = await upload.json();

  //     if (upload.ok) {
  //       return { success: true, data: res.data, message: res.message };
  //     } else {
  //       return { success: false, data: {}, message: res.message };
  //     }
}
