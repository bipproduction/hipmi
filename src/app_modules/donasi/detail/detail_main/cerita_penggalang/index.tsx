"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoadImageLandscape } from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Comp_SetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { apiGetDonasiCeritaPenggalang } from "@/app_modules/donasi/lib/api_donasi";
import { MODEL_CERITA_DONASI } from "@/app_modules/donasi/model/interface";
import { Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import moment from "moment";
import "moment/locale/id";
import { ComponentGlobal_NotifikasiGagal, ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";

export default function CeritaPenggalangDonasi() {
  const param = useParams<{ id: string }>();

  const [data, setData] = useState<MODEL_CERITA_DONASI | null>(null);

  useShallowEffect(() => {
    const getData = async () => {
      try {
        const response = await apiGetDonasiCeritaPenggalang({ id: param.id });
        if (response.success) {
          setData(response.data); 
        } else {
          ComponentGlobal_NotifikasiPeringatan(response.message);
        }
      } catch (error) {
        ComponentGlobal_NotifikasiGagal("Terjadi error saat mengambil data");
      }
    };
    getData();
  }, []);



  if (!data) return <CustomSkeleton height={"200px"} />;

  return (
    <>
      {data === null ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Stack
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            borderRadius: "10px",
            border: `2px solid ${AccentColor.blue}`,
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Text>
            {moment(data?.createdAt).format("DD MMMM YYYY")}
          </Text>
          <Text fw={"bold"}> #HaloOrangBaik</Text>

          <Comp_SetInnerHTML props={data?.pembukaan || ""} />

          <ComponentGlobal_LoadImageLandscape fileId={data?.imageId || ""} />

          <Comp_SetInnerHTML props={data?.cerita || ""} />
        </Stack>
      )}
    </>
  );
}
