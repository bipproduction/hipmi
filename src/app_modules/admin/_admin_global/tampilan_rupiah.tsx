import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Text } from "@mantine/core";

export default function ComponentAdminGlobal_TampilanRupiahDonasi({
  nominal,
  fontSize,
}: {
  nominal: number;
  fontSize?: number;
}) {
  return (
    <>
      <Text c={AdminColor.white} fz={fontSize ? fontSize : "md"}>
        Rp.{" "}
        {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
          nominal
        )}
      </Text>
    </>
  );
}
