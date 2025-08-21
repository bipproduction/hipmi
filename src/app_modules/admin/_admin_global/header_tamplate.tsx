"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Stack, Title } from "@mantine/core";

export default function ComponentAdminGlobal_HeaderTamplate({name}: {name: string}) {
  return (
    <>
      <Stack spacing={5} >
        <Title c={AdminColor.white}>{name ?  name : null}</Title>
      </Stack>
    </>
  );
}
