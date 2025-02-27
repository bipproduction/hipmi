"use client";

import { Button } from "@mantine/core";

interface DownloadButtonProps {
  fileUrl: string;
  fileName: string;
}

export default function Coba() {
  const fileUrl =
    "https://wibu-storage.wibudev.com/api/pdf-to-image?url=https://wibu-storage.wibudev.com/api/files/cm7liew81000t3y8ax1v6yo02";
  const fileName = "example.pdf"; // Nama file yang akan diunduh

  return (
    <div>
      <h1>Download File Example</h1>
      <DownloadButton fileUrl={fileUrl} fileName={fileName} />
    </div>
  );
}

export function DownloadButton({ fileUrl, fileName }: DownloadButtonProps) {
  const handleDownloadFromAPI = async () => {
    try {
      const response = await fetch("https://wibu-storage.wibudev.com/api/files/cm7liew81000t3y8ax1v6yo02")
      const blob = await response.blob(); // Konversi respons ke Blob
      const url = window.URL.createObjectURL(blob); // Buat URL untuk Blob
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated-file.pdf"; // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Bersihkan URL
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Button onClick={handleDownloadFromAPI} variant="outline" color="blue">
      Download File
    </Button>
  );
}
