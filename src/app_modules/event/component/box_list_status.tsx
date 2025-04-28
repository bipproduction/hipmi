"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Group, Stack, Text, Title } from "@mantine/core";
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

          <Text c={MainColor.white} fz={"sm"} lineClamp={4}>
            <Comp_DangerouslySetInnerHTML props={data.deskripsi} />
          </Text>
        </Stack>
        {visible && eventId !== "" ? (
          <ComponentGlobal_CardLoadingOverlay />
        ) : (
          ""
        )}
      </ComponentGlobal_CardStyles>
    </>
  );
}
