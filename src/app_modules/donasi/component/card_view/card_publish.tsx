"use client";

import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import { Grid, Progress, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_TampilanHitungMundur from "../tampilan_hitung_mundur";
import TampilanRupiahDonasi from "../tampilan_rupiah";

export default function ComponentDonasi_CardPublish({
  data,
  path,
}: {
  data: any;
  path: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [donasiId, setDonasiId] = useState("");

  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          setVisible(true);
          setDonasiId(data.id);
          router.push(path + `${data.id}`);
        }}
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <ComponentGlobal_LoadImageCustom
                fileId={data.imageId}
                height={150}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing={"xs"}>
                <Stack spacing={0}>
                  <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                    {data.title}
                  </Text>
                  <ComponentDonasi_TampilanHitungMundur
                    durasi={data?.DonasiMaster_Durasi?.name}
                    publishTime={data.publishTime}
                    textSize={10}
                  />
                </Stack>
                <Progress value={+data.progres} color="yellow" />
                <Stack spacing={0}>
                  <Text fz={"sm"}>Terkumpul</Text>
                  <Text fz={"sm"} fw={"bold"} c={"orange"} truncate>
                    <TampilanRupiahDonasi nominal={+data.terkumpul} />
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>
          {/* {width > 575 ? "" : <Divider />} */}
        </Stack>
        {visible && donasiId !== "" ? (
          <ComponentGlobal_CardLoadingOverlay />
        ) : (
          ""
        )}
      </ComponentGlobal_CardStyles>
    </>
  );
}
