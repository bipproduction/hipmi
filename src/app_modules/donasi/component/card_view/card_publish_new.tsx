"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { ComponentGlobal_CardStyles, ComponentGlobal_LoadImageCustom } from "@/app_modules/_global/component";
import { Grid, Progress, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import ComponentDonasi_TampilanHitungMundur from "../tampilan_hitung_mundur";
import TampilanRupiahDonasi from "../tampilan_rupiah";

export default function ComponentDonasi_CardPublishNew({ data }: { data: any; }) {
  const router = useRouter();

  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          // DELSOON
          console.log(RouterDonasi.detail_main + `${data.id}`)
          router.push(RouterDonasi.detail_main + `${data.id}`)
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
                    durasi={data?.nameDonasiDurasi}
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
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
