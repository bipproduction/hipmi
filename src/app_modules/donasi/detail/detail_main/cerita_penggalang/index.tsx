"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoadImageLandscape } from "@/app_modules/_global/component";
import { Comp_SetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";
import { Comp_V3_SetInnerHTMLWithStiker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { MODEL_CERITA_DONASI } from "@/app_modules/donasi/model/interface";
import { Stack, Text } from "@mantine/core";
import { useState } from "react";

export default function CeritaPenggalangDonasi({
  dataCerita,
}: {
  dataCerita: MODEL_CERITA_DONASI;
}) {
  const [data, setData] = useState(dataCerita);
  return (
    <>
      {/* <pre>{JSON.stringify(data.imageCeritaDonasi, null, 2)}</pre> */}
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
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
            data.createdAt
          )}
        </Text>
        <Text fw={"bold"}> #HaloOrangBaik</Text>
        {/* <Text>{data.pembukaan}</Text> */}

        <Comp_SetInnerHTML props={data?.pembukaan} />

        <ComponentGlobal_LoadImageLandscape fileId={data.imageId} />

        <Comp_SetInnerHTML props={data?.cerita} />

        {/* <Text>{data.cerita}</Text> */}
      </Stack>
    </>
  );
}
