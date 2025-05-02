"use client";

import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { Component_V3_GridDetailData } from "@/app_modules/_global/component/new/comp_V3_grid_detail_data";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Card, Center, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_COLLABORATION } from "../../model/interface";

export default function ComponentColab_CardSectionData({
  colabId,
  path,
  data,
}: {
  colabId?: any;
  path?: any;
  data?: MODEL_COLLABORATION;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const listData = [
    {
      title: "Industri",
      value: data?.ProjectCollaborationMaster_Industri.name
        ? data.ProjectCollaborationMaster_Industri.name
        : "Industri",
    },
    {
      title: "Lokasi",
      value: data?.lokasi ? data.lokasi : "-",
    },
  ];

  return (
    <>
      <Card.Section
        mt={0}
        bg={MainColor.soft_darkblue}
        p={"sm"}
        onClick={() => {
          if (path) {
            setVisible(true);
            router.push(path + colabId);
          } else {
            ComponentGlobal_NotifikasiPeringatan("Path tidak ditemukan");
          }
        }}
      >
        <Center px={"md"} mb={"lg"}>
          <Title order={5} lineClamp={1}>
            {data?.title ? data.title : "Judul Proyek"}
          </Title>
        </Center>
        <Stack spacing={5}>
          {listData.map((e, i) => (
            <Component_V3_GridDetailData item={e} key={i} />
          ))}
        </Stack>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </Card.Section>
    </>
  );
}
