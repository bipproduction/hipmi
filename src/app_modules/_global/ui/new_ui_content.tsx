import { Box } from "@mantine/core";

export function NewUI_Content({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        style={{
          position: "fixed",
          top: "8vh", // Mulai di bawah header
          bottom: "10vh", // Berakhir di atas footer
          left: 0,
          right: 0,
          overflowY: "auto", // Bisa di-scroll
          padding: "16px",
          maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
          margin: "0 auto", // Pusatkan di tengah layar desktop
        }}
      >
        {children}
      </Box>
    </>
  );
}
