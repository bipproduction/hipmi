"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Comp_DangerouslySetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";
import { Component_V3_GridDetailData } from "@/app_modules/_global/component/new/comp_V3_grid_detail_data";
import { Component_V3_MomentDateAndTime } from "@/app_modules/_global/component/new/comp_V3_moment_date_and_time";
import { clientLogger } from "@/util/clientLogger";
import { Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import "moment/locale/id";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetEventDetailById } from "../../_lib/api_event";
import { MODEL_EVENT } from "../../_lib/interface";
import { Event_ComponentDaftarPesertaDanSponsor } from "../button/comp_daftar_peserta_dan_sponsor";
import { Event_ComponentSkeletonDetail } from "../skeleton/comp_skeleton_detail";

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
      value: <Comp_DangerouslySetInnerHTML props={data?.deskripsi ?? ""} />,
    },
  ];

  return (
    <>
      {data == null ? (
        <Event_ComponentSkeletonDetail />
      ) : (
        <ComponentGlobal_CardStyles>
          <Stack  spacing={"xl"}>
            <ComponentGlobal_AvatarAndUsername
              profile={data?.Author?.Profile as any}
            />

            <Stack spacing={"xl"}>
              <Title color={MainColor.white} align="center" order={4}>
                {data ? data.title : null}
              </Title>
              <Stack>
                {listData.map((e, i) => (
                  <Component_V3_GridDetailData item={e} key={i} />
                ))}
              </Stack>
              <Event_ComponentDaftarPesertaDanSponsor />
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>
      )}
    </>
  );
}
