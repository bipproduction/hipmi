"use client";

import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../_component/detail_gambar_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../_component/ui_detail_file";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { useParams } from "next/navigation";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { apiGetAdminInvestasiById } from "../_lib/api_fetch_admin_investasi";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { Admin_V3_ComponentSkeletonBreakpoint } from "../../_components_v3/comp_skeleton_breakpoint";
import { AdminInvestasi_ComponentNewDetailData } from "../_component/new_detail_data";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";

export function AdminInvestasi_DetailReject() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_INVESTASI | null>(null);

  useShallowEffect(() => {
    loadInitialData();
  }, []);
  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminInvestasiById({
        id: params.id,
      });

      if (response?.success && response?.data) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error);
      setData(null);
    }
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name={"Investasi: Reject"} />
        <Admin_ComponentBackButton />

        {!data ? (
          <CustomSkeleton h={200} w={"50%"} />
        ) : (
          <Admin_V3_ComponentBreakpoint>

          <Admin_ComponentBoxStyle>
            <Stack>
              <Title order={3} c={"red"}>
                #{" "}
                <Text span inherit c={AdminColor.white}>
                  Alasan penolakan
                </Text>
              </Title>
              <Text c={AdminColor.white}>{data?.catatan}</Text>
            </Stack>
          </Admin_ComponentBoxStyle>
          </Admin_V3_ComponentBreakpoint>
        )}

        {!data ? (
          <Admin_V3_ComponentSkeletonBreakpoint />
        ) : (
          <Admin_V3_ComponentBreakpoint md={2} lg={2}>
            <AdminInvestasi_ComponentNewDetailData data={data as any} />
            {/* Data Foto */}
            <Admin_V3_ComponentBreakpoint cols={1}>
              <ComponentAdminInvestasi_DetailGambar imagesId={data?.imageId} />
              <ComponentAdminInvestasi_UIDetailFile
                title={data?.title}
                dataProspektus={data?.ProspektusInvestasi}
                listDokumen={data?.DokumenInvestasi}
                prospektusFileId={data?.prospektusFileId}
              />
            </Admin_V3_ComponentBreakpoint>
          </Admin_V3_ComponentBreakpoint>
        )}

      
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
