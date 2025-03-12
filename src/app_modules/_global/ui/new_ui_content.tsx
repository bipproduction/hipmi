import { Box } from "@mantine/core";

export function NewUI_Content({
  children,
  isScroll,
}: {
  children: React.ReactNode;
  isScroll?: React.CSSProperties["overflowY"];
}) {
  return (
    <>
      <Box
        style={{
          top: "8vh", // Mulai di bawah header
          bottom: "10vh", // Berakhir di atas footer
          left: 0,
          right: 0,
          overflowY: isScroll ? isScroll : "hidden", // Bisa di-scroll
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
