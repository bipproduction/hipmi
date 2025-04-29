"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../_lib/interface";
import { Comp_DangerouslySetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";

export default function ComponentEvent_BoxListStatus({
  data,
  path,
}: {
  data: MODEL_EVENT;
  path: string;
}) {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles
        marginBottom={"15px"}
        onClickHandler={() => {
          setEventId(data?.id);
          setVisible(true);
          router.push(path + data.id);
        }}
        // style={{
        //   maxHeight: 200,
        //   overflow: "hidden",
        //   position: "relative",
        // }}
      >
        <Stack>
          <Group w={"100%"} position="apart" grow>
            <Title color={MainColor.white} order={5} lineClamp={1}>
              {data.title}
            </Title>
            <Text c={MainColor.white} align="right" fz={"sm"} lineClamp={1}>
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "medium",
              }).format(new Date(data.tanggal))}
            </Text>
          </Group>
          <Text fz={"sm"} lineClamp={2}>
            <Comp_DangerouslySetInnerHTML
              props={data.deskripsi}
              style={{ height: 50 }}
            />
          </Text>
        </Stack>
        {visible && eventId !== "" && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>

      {/* <Box
        pos="relative"
        mah={200}
        mx="auto"
        p="md"
        bg="#002860"
        style={{
          overflow: "hidden",
          borderRadius: 12,
          border: "1px solid #1346a1",
        }}
      >
        <div
          style={{
            color: "white",
            wordBreak: "break-word",
          }}
          dangerouslySetInnerHTML={{
            __html: data.deskripsi.trim(),
          }}
        />


        <Box
        pos="absolute"
        bottom={0}
        left={0}
        right={0}
        h={50}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #002860 100%)", // warna fade cocokkan dengan background box
          pointerEvents: "none",
        }}
      />
      </Box> */}
    </>
  );
}
