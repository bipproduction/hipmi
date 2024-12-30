import { Text } from "@mantine/core";
import { MainColor } from "../color";

export default function ComponentGlobal_TampilanRupiah({
  nominal,
  color,
  fontSize,
  fontWeight,
}: {
  nominal: number;
  color?: string;
  fontSize?: number | string;
  fontWeight?: string | number;
}) {
  return (
    <>
      <Text
        fw={fontWeight ? fontWeight : "bold"}
        fz={fontSize ? fontSize : "md"}
        style={{
          color: color ? color : MainColor.white,
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
