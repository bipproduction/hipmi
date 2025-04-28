import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { Group, Stack, Text, Title } from "@mantine/core";

import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../../_lib/interface";
import { Comp_DangerouslySetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";

export function ComponentEvent_CardRiwayat({ data }: { data: MODEL_EVENT }) {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"15px"}>
        <Stack>
          <ComponentGlobal_AvatarAndUsername
            profile={data.Author?.Profile as any}
          />

          <Stack
            spacing={5}
            onClick={() => {
              setVisible(true);
              setEventId(data?.id);
              router.push(RouterEvent.detail_riwayat + data.id);
            }}
          >
            <Group w={"100%"} position="apart" grow>
              <Title order={5} lineClamp={1}>
                {data.title}
              </Title>
              <Text align="right" fz={"sm"} lineClamp={1}>
                {new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "medium",
                }).format(new Date(data.tanggal))}
              </Text>
            </Group>

            <Text fz={"sm"} lineClamp={4}>
              <Comp_DangerouslySetInnerHTML props={data.deskripsi}/>
            </Text>
          </Stack>

          {visible && eventId !== "" ? (
            <ComponentGlobal_CardLoadingOverlay />
          ) : (
            ""
          )}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
