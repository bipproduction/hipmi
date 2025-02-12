import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Stack, Text } from "@mantine/core";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";

export function Investasi_ComponentCardDaftarDocument({
  data,
}: {
  data: MODEL_INVESTASI_DOKUMEN;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  return (
    <ComponentGlobal_CardStyles>
      <Stack
        justify="center"
        h={"100%"}
        onClick={() => {
          router.push(
            NEW_RouterInvestasi.file_prospektus({ id: data.fileId }),
            { scroll: false }
          );
          setVisible(true);
        }}
      >
        <Text lineClamp={2}>{data.title}</Text>
      </Stack>
      {visible && <ComponentGlobal_CardLoadingOverlay />}
    </ComponentGlobal_CardStyles>
  );
}
