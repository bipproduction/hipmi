import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { Center, Group, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconFileTypePdf } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiNewGetOneInvestasiById } from "../../_lib/api_fetch_new_investasi";
import { MODEL_INVESTASI } from "../../_lib/interface";

export function Investasi_ViewDetailProspektus() {
  const param = useParams<{ id: string }>();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [dataInvestasi, setDataInvestasi] = useState<MODEL_INVESTASI | null>(
    null
  );
  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiNewGetOneInvestasiById({ id: param.id });
      if (response.success) {
        setDataInvestasi(response.data);
      } else {
        setDataInvestasi(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!dataInvestasi) return <CustomSkeleton height={"80vh"} width={"100%"} />;

  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          router.push(
            NEW_RouterInvestasi.file_prospektus({
              id: dataInvestasi?.prospektusFileId,
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
