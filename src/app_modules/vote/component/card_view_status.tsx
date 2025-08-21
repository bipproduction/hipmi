"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Badge, Stack, Text } from "@mantine/core";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_VOTING } from "../model/interface";

export default function ComponentVote_CardViewStatus({
  path,
  data,
}: {
  path?: string;
  data?: MODEL_VOTING;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          if (data?.id === undefined) {
            ComponentGlobal_NotifikasiPeringatan("Halaman tidak ditemukan");
          } else {
            setVisible(true);
            router.push((path as string) + data?.id);
          }
        }}
      >
        {/* Isi deskripsi */}
        <Stack px={"xs"} align="center">
          <Text fw={"bold"} lineClamp={1} align="center">
            {data?.title}
          </Text>
          <Badge
            // size="md"
            styles={{
              root: {
                backgroundColor: AccentColor.blue,
                border: `1px solid ${AccentColor.skyblue}`,
                color: MainColor.white,
                width: "70%",
              },
            }}
          >
            <Text>
              {data ? moment(data.awalVote).format("ll") : "tgl awal voting"} -{" "}
              {data ? moment(data.akhirVote).format("ll") : "tgl akhir voting"}
            </Text>
          </Badge>
        </Stack>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>
    </>
  );
}
