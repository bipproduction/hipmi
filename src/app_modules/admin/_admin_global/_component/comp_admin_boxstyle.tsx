import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Paper } from "@mantine/core";

export function Admin_ComponentBoxStyle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <Paper
        bg={AdminColor.softBlue}
        radius={"md"}
        p={"md"}
        c={AdminColor.white}
        style={{
          ...style,
        }}
      >
        {children}
      </Paper>
    </>
  );
}
