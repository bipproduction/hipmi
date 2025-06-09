"use client";

import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import { Group, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { MODEL_DONASI_KABAR } from "../../model/interface";
import { apiGetDonasiKabarById } from "../../lib/api_donasi";
import { useParams } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function DetailKabarDonasi() {
  const param = useParams<{ id: string }>();
  const [kabar, setKabar] = useState<MODEL_DONASI_KABAR | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetDonasiKabarById({ id: param.id });
      if (response.success) {
        setKabar(response.data);
      }
    } catch (error) {
      console.error("Error fetching kabar data:", error);
    }
  }

  if (!kabar) {
    return <CustomSkeleton />;
  }

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Group position="right">
            <Text>
              {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
                kabar.createdAt
              )}
            </Text>
          </Group>

          {kabar.imageId === null ? (
            ""
          ) : (
            <ComponentGlobal_LoadImageLandscape fileId={kabar.imageId} />
          )}
          <Title align="center" order={4}>
            {kabar.title}
          </Title>
          <Text>{kabar.deskripsi}</Text>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
