import { Box } from "@mantine/core";
import { AccentColor } from "../color";

export function NewUI_Footer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "10vh",
          zIndex: 100,
          backgroundColor: AccentColor.darkblue,
          borderTop: `2px solid ${AccentColor.blue}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "500px", // Batasi lebar maksimum untuk tampilan mobile
          margin: "0 auto", // Pusatkan di tengah layar desktop
        }}
      >
        {children}
      </Box>
    </>
  );
}
