"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { UiMap_CustomPin } from "../ui";
import { apiGetOneMapByPortofolioId } from "../lib/api_map";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ComponentGlobal_BoxInformation } from "@/app_modules/_global/component";

export function Map_CustomPin({ mapboxToken }: { mapboxToken: string }) {
  const { id } = useParams();
  const [data, setData] = useState<any | null>();

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetOneMapByPortofolioId({ id: id as string });
      if (response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      setData(null);
      console.error("Error get one map by portofolio id", error);
    }
  }
  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Custom Pin" />
        </UI_NewHeader>
        <UI_NewChildren>
          {data === undefined ? (
            <CustomSkeleton height={400} />
          ) : !data ? (
            <ComponentGlobal_BoxInformation informasi="Data tidak ditemukan" />
          ) : (
            <UiMap_CustomPin mapboxToken={mapboxToken} dataMap={data} />
          )}
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
