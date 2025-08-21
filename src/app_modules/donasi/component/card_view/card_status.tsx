import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import {
  AspectRatio,
  Card,
  Grid,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_DONASI } from "../../model/interface";

export function ComponentDonasi_CardStatus({
  data,
  path,
}: {
  data: MODEL_DONASI;
  path: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          setVisible(true);
          router.push(path + `${data.id}`);
        }}
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <ComponentGlobal_LoadImageCustom
                fileId={data.imageId}
                height={100}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing={"xs"}>
                <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                  {data.title}
                </Text>
                <Stack spacing={0}>
                  <Text fz={"sm"}>Terget Dana</Text>
                  <Text fz={"sm"} fw={"bold"} c={"yellow"} lineClamp={1}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumFractionDigits: 10,
                    }).format(+data.target)}
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>
          {/* {width > 575 ? "" : <Divider />} */}
        </Stack>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>
      {/* <Card
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
          marginBottom: "15px",
        }}
        onClick={() => {
          setVisible(true);
          router.push(path + `${data.id}`);
        }}
      >
        
      </Card> */}
    </>
  );
}
