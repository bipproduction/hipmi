import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color";
import {
    ComponentGlobal_CardLoadingOverlay,
    ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Center, Group, Text } from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI } from "../../_lib/interface";

export function Investasi_ViewDetailProspektus({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          router.push(
            NEW_RouterInvestasi.file_prospektus({
              id: dataInvestasi.prospektusFileId,
            }),
            { scroll: false }
          );
          setVisible(true);
        }}
      >
        <Group position="apart">
          <Text w={"80%"} lineClamp={1}>
            Prospektus {dataInvestasi?.title}
          </Text>
          <Center>
            <IconFileTypePdf style={{ color: MainColor.yellow }} />
          </Center>
        </Group>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>
    </>
  );
}
