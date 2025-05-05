"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Comp_SetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";
import { Component_V3_GridDetailData } from "@/app_modules/_global/component/new/comp_V3_grid_detail_data";
import { Component_V3_MomentDateAndTime } from "@/app_modules/_global/component/new/comp_V3_moment_date_and_time";
import { SimpleGrid, Stack, Title } from "@mantine/core";
import "moment/locale/id";
import { MODEL_EVENT } from "../../_lib/interface";
import { Event_ComponentSkeletonDetail } from "../skeleton/comp_skeleton_detail";
import Event_ComponentBoxDaftarPeserta from "./comp_box_daftar_peserta";
export default function ComponentEvent_DetailData({
  isDaftarPeserta,
  isReport,
  data,
}: {
  isDaftarPeserta?: boolean;
  isReport?: boolean;
  data: MODEL_EVENT | null;
}) {
  const listData = [
    {
      title: "Lokasi",
      value: data?.lokasi ?? "-",
    },
    {
      title: "Tipe Acara",
      value: `${data?.EventMaster_TipeAcara?.name}`,
    },
    {
      title: "Tanggal Mulai ",
      value: <Component_V3_MomentDateAndTime dateTime={data?.tanggal} />,
    },
    {
      title: "Tanggal Selesai ",
      value: <Component_V3_MomentDateAndTime dateTime={data?.tanggalSelesai} />,
    },
    {
      title: "Deskripsi",
      value: <Comp_SetInnerHTML props={data?.deskripsi ?? ""} />,
    },
  ];

  return (
    <>
      {!data ? (
        <Event_ComponentSkeletonDetail />
      ) : (
        <Stack>
          {isReport && data.catatan  ? (
            <ComponentGlobal_BoxInformation
              isReport
              informasi={data?.catatan}
            />
          ) : (
            ""
          )}

          <ComponentGlobal_CardStyles marginBottom={"16px"}>
            <Stack>
              <Stack spacing={"xl"}>
                <Title
                  color={MainColor.white}
                  // lineClamp={2}
                  align="center"
                  w={"100%"}
                  order={4}
                >
                  {data ? data?.title : null}
                </Title>

                <Stack>
                  {listData.map((e, i) => (
                    <Component_V3_GridDetailData item={e} key={i} />
                  ))}
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
                  {/* <Event_ComponentBoxDaftarSponsor /> */}
                </SimpleGrid>
              )}
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      )}
    </>
  );
}
