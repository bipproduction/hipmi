import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import { Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetBeritaInvestasiById } from "../../_lib/api_interface";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

type MODEL_DATA = Prisma.BeritaInvestasiGetPayload<{}>;

export function Investasi_ViewDetailBerita() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [data, setData] = useState<MODEL_DATA | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetBeritaInvestasiById({
        id: id,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get detail berita", error);
    }
  }

  if (!data) {
    return <CustomSkeleton height={300} width={"100%"} />;
  }

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          {data.imagesId && (
            <ComponentGlobal_LoadImageLandscape
              fileId={data.imageId as string}
            />
          )}

          <Title order={4} align="center">
            {data.title}
          </Title>

          <Text>{data.deskripsi}</Text>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
