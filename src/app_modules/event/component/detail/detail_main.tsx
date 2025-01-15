"use client";

import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Center, Grid, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core";
import { MODEL_EVENT } from "../../model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { API_RouteEvent } from "@/app/lib/api_user_router/route_api_event";
import { Event_ComponentSkeletonDetail } from "../skeleton/comp_skeleton_detail";
import moment from "moment";
import "moment/locale/id";
import { MainColor } from "@/app_modules/_global/color";
import Event_ComponentBoxDaftarPeserta from "./comp_box_daftar_peserta";
import Event_ComponentBoxDaftarSponsor from "./comp_box_sponsor";

export default function ComponentEvent_DetailMainData({
  eventId,
}: {
  eventId: string;
}) {
  const [data, setData] = useState<MODEL_EVENT | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    const data = await fetch(
      API_RouteEvent.get_one_by_id({ eventId: eventId })
    );
    const res = await data.json();
    setData(res.data);
  }

  return (
    <>
      {data == null ? (
        <Event_ComponentSkeletonDetail />
      ) : (
        <ComponentGlobal_CardStyles>
          <Stack px={"xs"} spacing={"xl"}>
            <ComponentGlobal_AvatarAndUsername
              profile={data?.Author?.Profile as any}
            />

            <Stack spacing={"xl"}>
              <Title color={MainColor.white} align="center" order={4}>
                {data ? data.title : null}
              </Title>
              <Grid>
                <Grid.Col span={4}>
                  <Text c={MainColor.white} fw={"bold"}>Lokasi</Text>
                </Grid.Col>
                <Grid.Col span={1}>:</Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text c={MainColor.white}>{data ? data.lokasi : null}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={4}>
                  <Text c={MainColor.white} fw={"bold"}>Tipe Acara</Text>
                </Grid.Col>
                <Grid.Col span={1}>:</Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text c={MainColor.white}>{data ? data.EventMaster_TipeAcara.name : null}</Text>
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
                      {moment(
                        data.tanggal?.toLocaleString("id-ID", {
                          dateStyle: "full",
                        })
                      ).format("dddd, DD MMMM YYYY, LT")}
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
                      {moment(
                        data.tanggalSelesai?.toLocaleString("id-ID", {
                          dateStyle: "full",
                        })
                      ).format("dddd, DD MMMM YYYY, LT")}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>

              <Stack spacing={2}>
                <Text c={MainColor.white} fw={"bold"}>Deskripsi</Text>
                <Text c={MainColor.white}>{data ? data?.deskripsi : null}</Text>
              </Stack>
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: "48rem", cols: 2, spacing: "sm" },
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}
              >
                  <Event_ComponentBoxDaftarPeserta/>
                  <Event_ComponentBoxDaftarSponsor />
              </SimpleGrid>
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>
      )}
    </>
  );
}
