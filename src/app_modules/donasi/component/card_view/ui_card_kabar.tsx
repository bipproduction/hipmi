"use client";

import { Stack, Text, Title } from "@mantine/core";

import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_DONASI_KABAR } from "../../model/interface";

export default function ComponentDonasi_ListKabar({
  kabar,
  route,
}: {
  kabar: MODEL_DONASI_KABAR;
  route: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          router.push(route + `${kabar.id}`);
          setVisible(true);
        }}
      >
        <Stack>
          <Text fz={"xs"}>
            {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
              kabar.createdAt
            )}
          </Text>
          <Title order={5}>{kabar.title}</Title>
        </Stack>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>
    </>
  );
}
