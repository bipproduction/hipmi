"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Grid, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { MODEL_EVENT } from "../../_lib/interface";
import { Event_ComponentSkeletonDetail } from "../skeleton/comp_skeleton_detail";
import Event_ComponentBoxDaftarPeserta from "./comp_box_daftar_peserta";
import Event_ComponentBoxDaftarSponsor from "./comp_box_sponsor";

export default function ComponentEvent_DetailData({
  isDaftarPeserta,
  isReport,
  data,
}: {
  isDaftarPeserta?: boolean;
  isReport?: boolean;
  data: MODEL_EVENT | null;
}) {
  return (
    <>
      {!data ? (
        <Event_ComponentSkeletonDetail />
      ) : (
        <Stack>
          {isReport && (
            <ComponentGlobal_BoxInformation
              isReport
              informasi={data?.catatan}
            />
          )}

          <ComponentGlobal_CardStyles marginBottom={"16px"}>
            <Stack>
              <Stack px={"sm"} spacing={"xl"}>
                <Title
                  color={MainColor.white}
                  lineClamp={2}
                  align="center"
                  w={"100%"}
                  order={4}
                >
                  {data ? data?.title : null}
                </Title>
                <Grid>
                  <Grid.Col span={4}>
                    <Text c={MainColor.white} fw={"bold"}>
                      Lokasi
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={1}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text c={MainColor.white}>
                      {data ? data?.lokasi : null}
                    </Text>
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
                      {data ? data.EventMaster_TipeAcara?.name : null}
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
                        {" "}
                        {new Intl.DateTimeFormat("id-ID", {
                          dateStyle: "full",
                        }).format(new Date(data?.tanggal))}
                        ,{" "}
                        <Text span inherit c={MainColor.white}>
                          {new Intl.DateTimeFormat("id-ID", {
                            timeStyle: "short",
                          }).format(new Date(data?.tanggal))}
                        </Text>
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
                        {" "}
                        {new Intl.DateTimeFormat("id-ID", {
                          dateStyle: "full",
                        }).format(new Date(data?.tanggalSelesai))}
                        ,{" "}
                        <Text span inherit c={MainColor.white}>
                          {new Intl.DateTimeFormat("id-ID", {
                            timeStyle: "short",
                          }).format(new Date(data?.tanggalSelesai))}
                        </Text>
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Stack>

                <Stack spacing={2}>
                  <Text c={MainColor.white} fw={"bold"}>
                    Deskripsi
                  </Text>
                  <Text c={MainColor.white}>
                    {data ? data?.deskripsi : null}
                  </Text>
                </Stack>
              </Stack>

              {isDaftarPeserta && (
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
              )}
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      )}
    </>
  );
}
