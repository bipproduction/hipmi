"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Grid, Stack, Text, Title } from "@mantine/core";
import { MODEL_EVENT } from "../../model/interface";
import { MainColor } from "@/app_modules/_global/color";

export default function ComponentEvent_DetailData({
  data,
}: {
  data: MODEL_EVENT;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"16px"}>
        <Stack px={"sm"} spacing={"xl"}>
          <Title color={MainColor.white} lineClamp={2} align="center" w={"100%"} order={4}>
            {data ? data?.title : null}
          </Title>
          <Grid>
            <Grid.Col span={4}>
              <Text c={MainColor.white} fw={"bold"}>Lokasi</Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>
              <Text c={MainColor.white}>{data ? data?.lokasi : null}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>
              <Text c={MainColor.white} fw={"bold"}>Tipe Acara</Text>
            </Grid.Col>
            <Grid.Col span={1}>:</Grid.Col>
            <Grid.Col span={"auto"}>
              <Text c={MainColor.white}>{data ? data.EventMaster_TipeAcara?.name : null}</Text>
            </Grid.Col>
          </Grid>
          <Stack spacing={"xs"}>
            <Text c={MainColor.white} fw={"bold"}>Tanggal & Waktu</Text>
            <Grid>
              <Grid.Col span={4}>
                <Text c={MainColor.white} fw={"bold"}>Mulai</Text>
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={"auto"}>
                <Text c={MainColor.white}>
                  {" "}
                  {new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "full",
                  }).format(data?.tanggal)}
                  ,{" "}
                  <Text span inherit c={MainColor.white}>
                    {new Intl.DateTimeFormat("id-ID", {
                      timeStyle: "short",
                    }).format(data?.tanggal)}
                  </Text>
                </Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>
                <Text c={MainColor.white} fw={"bold"}>Selesai</Text>
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={"auto"}>
                <Text c={MainColor.white}>
                  {" "}
                  {new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "full",
                  }).format(data?.tanggalSelesai)}
                  ,{" "}
                  <Text span inherit c={MainColor.white}>
                    {new Intl.DateTimeFormat("id-ID", {
                      timeStyle: "short",
                    }).format(data?.tanggalSelesai)}
                  </Text>
                </Text>
              </Grid.Col>
            </Grid>
          </Stack>

          <Stack spacing={2}>
            <Text c={MainColor.white} fw={"bold"}>Deskripsi</Text>
            <Text c={MainColor.white}>{data ? data?.deskripsi : null}</Text>
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
