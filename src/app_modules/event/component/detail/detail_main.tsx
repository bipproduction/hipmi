"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { clientLogger } from "@/util/clientLogger";
import { Grid, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import "moment/locale/id";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetEventDetailById } from "../../_lib/api_event";
import { MODEL_EVENT } from "../../_lib/interface";
import { Event_ComponentSkeletonDetail } from "../skeleton/comp_skeleton_detail";
import Event_ComponentBoxDaftarPeserta from "./comp_box_daftar_peserta";
import Event_ComponentBoxDaftarSponsor from "./comp_box_sponsor";

export default function ComponentEvent_DetailMainData() {
  const params = useParams<{ id: string }>();
  const eventId = params.id as string;
  const [data, setData] = useState<MODEL_EVENT | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetEventDetailById({
        id: eventId,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data detail event", error);
    }
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
                  <Text c={MainColor.white} fw={"bold"}>
                    Lokasi
                  </Text>
                </Grid.Col>
                <Grid.Col span={1}>:</Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text c={MainColor.white}>{data ? data.lokasi : null}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={4}>
                  <Text c={MainColor.white} fw={"bold"}>
                    Tipe Acara
                  </Text>
                </Grid.Col>
                <Grid.Col span={1}>:</Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text c={MainColor.white}>
                    {data ? data.EventMaster_TipeAcara.name : null}
                  </Text>
                </Grid.Col>
              </Grid>

              <Stack spacing={"xs"}>
                <Text c={MainColor.white} fw={"bold"}>
                  Tanggal & Waktu
                </Text>
                <Grid>
                  <Grid.Col span={4}>
                    <Text c={MainColor.white} fw={"bold"}>
                      Mulai
                    </Text>
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
                    <Text c={MainColor.white} fw={"bold"}>
                      Selesai
                    </Text>
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
                <Text c={MainColor.white} fw={"bold"}>
                  Deskripsi
                </Text>
                <Text c={MainColor.white}>{data ? data?.deskripsi : null}</Text>
              </Stack>
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: "48rem", cols: 2, spacing: "sm" },
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}
              >
                <Event_ComponentBoxDaftarPeserta />
                <Event_ComponentBoxDaftarSponsor />
              </SimpleGrid>
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>
      )}
    </>
  );
}
