import { AdminColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import { Text } from "@mantine/core";

export  function ComponentAdminGlobal_TampilanRupiah({
  nominal,
  color,
  fontSize,
}: {
  nominal: number;
  color?: string;
  fontSize?: number;
}) {
  return (
    <>
      <Text
        fz={fontSize ? fontSize : "md"}
        style={{
          color: color ? color : AdminColor.white,
        }}
      >
        Rp.{" "}
        {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
          nominal
        )}
      </Text>
    </>
  );
}
