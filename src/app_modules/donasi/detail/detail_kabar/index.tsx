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
import moment from "moment";
import "moment/locale/id";

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
    return <CustomSkeleton h={300} />;
  }

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Group position="right">
            <Text>
              {moment(kabar.createdAt).format("DD MMM YYYY")}
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
