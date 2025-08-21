"use client";

import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { Group, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import "moment/locale/id";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetDonasiKabarById } from "../../lib/api_donasi";
import { MODEL_DONASI_KABAR } from "../../model/interface";

export default function UpdateKabarDonasi() {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_DONASI_KABAR | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetDonasiKabarById({ id: id as string });
      // console.log("res >", response)
      if (response && response.success) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get data kabar", error);
    }
  }

  if (!data) return <CustomSkeleton height={300} />;

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Group position="right">
            <Text>
              {moment(data.createdAt).format("DD MMM YYYY")}
            </Text>
          </Group>

          {data.imageId === null ? (
            ""
          ) : (
            <ComponentGlobal_LoadImageLandscape fileId={data.imageId} />
          )}
          <Title align="center" order={4}>
            {data.title}
          </Title>
          <Text>{data.deskripsi}</Text>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
