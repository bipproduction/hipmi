"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Image, Paper, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ComponentPortofolio_ButtonEditLogoBisnis } from "../../component";
import { apiGetPortofolioById } from "../../component/api_fetch_portofolio";
import { MODEL_PORTOFOLIO } from "../../model/interface";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Portofolio_SkeletonEditLogoBisnis } from "../../component/skeleton_view";

export default function Portofolio_EditLogoBisnis() {
  const params = useParams<{ id: string }>();
  const portofolioId = params.id;
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);
  const [data, setData] = useState<MODEL_PORTOFOLIO | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = async () => {
    try {
      const respone = await apiGetPortofolioById({
        id: portofolioId,
      });

      if (respone.success) {
        setData(respone.data);
      } else {
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get data portofolio", error);
    }
  };

  if (!data) return <Portofolio_SkeletonEditLogoBisnis />;

  return (
    <>
      <Stack spacing={"xl"} px={"sm"}>
        <Stack>
          <Paper
            p={"sm"}
            style={{
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px ",
              padding: "15px",
              color: "white",
            }}
          >
            {img ? (
              <Image maw={250} alt="Image" src={img} />
            ) : (
              <ComponentGlobal_LoadImage fileId={data.logoId} />
            )}
          </Paper>
          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFile}
              onSetImage={setImg}
            />
          </Center>
        </Stack>
        <ComponentPortofolio_ButtonEditLogoBisnis
          file={file as any}
          portofolioId={data.id}
          fileRemoveId={data.logoId}
        />
      </Stack>
    </>
  );
}
