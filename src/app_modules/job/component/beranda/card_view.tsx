"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Center, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_JOB } from "../../model/interface";

export default function ComponentJob_BerandaCardView({
  data,
}: {
  data: MODEL_JOB;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentGlobal_AvatarAndUsername
            profile={data.Author.Profile as any}
          />

          <Center
            h={50}
            onClick={() => {
              setVisible(true), router.push(RouterJob.main_detail + data.id);
            }}
          >
            <Text fw={"bold"} fz={"xl"} lineClamp={1} c={"white"}>
              {data.title}
            </Text>
          </Center>

          {visible && <ComponentGlobal_CardLoadingOverlay />}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
