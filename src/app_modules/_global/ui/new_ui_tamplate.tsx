"use client";

import { BackgroundImage, Box } from "@mantine/core";
import { MainColor } from "../color";

export function NewUI_Tamplate({ children }: { children: React.ReactNode }) {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: MainColor.black,
        position: "relative",
        maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
        margin: "0 auto", // Pusatkan di tengah layar desktop
        border: "1px solid #ccc", // Garis tepi untuk visualisasi
      }}
    >
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1, // Pastikan background di belakang konten
          backgroundImage: "url(/aset/global/main_background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
          margin: "0 auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
