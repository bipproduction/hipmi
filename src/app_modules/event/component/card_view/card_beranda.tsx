import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentEvent_CardBeranda({ data }: { data: any }) {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"15px"}>
        <Stack>
          <ComponentGlobal_AvatarAndUsername
            profile={data?.Author?.Profile as any}
          />

          <Stack
            spacing={5}
            // p={"md"}
            onClick={() => {
              setEventId(data?.id);
              setVisible(true);
              router.push(RouterEvent.detail_main + data?.id);
            }}
          >
            <Group w={"100%"} position="apart" grow>
              <Title order={5} lineClamp={1}>
                {data.title}
              </Title>
              {/* <Text align="right" fz={"sm"} lineClamp={1}>
                {new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "medium",
                }).format(data?.tanggal)}
              </Text> */}
            </Group>

            <Text fz={"sm"} lineClamp={2}>
              {data.deskripsi}
            </Text>
          </Stack>

          {visible && data?.id === eventId && (
            <ComponentGlobal_CardLoadingOverlay />
          )}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
