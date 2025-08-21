import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { clientLogger } from "@/util/clientLogger";
import { SimpleGrid } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../../_component/detail_gambar_investasi";
import SkeletonAdminInvestasi from "../../_component/skeleton_admin_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../../_component/ui_detail_file";
import { apiGetAdminInvestasiById } from "../../_lib/api_fetch_admin_investasi";
import { Admin_V3_ComponentBreakpoint } from "@/app_modules/admin/_components_v3/comp_simple_grid_breakpoint";
import { AdminInvestasi_ComponentNewDetailData } from "../../_component/new_detail_data";
import { Admin_V3_ComponentSkeletonBreakpoint } from "@/app_modules/admin/_components_v3/comp_skeleton_breakpoint";

export function AdminInvestasi_ViewDetailData() {
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

{/*  
      {!data ? (
        <SkeletonAdminInvestasi />
      ) : (
        <>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >

            <ComponentAdminInvestasi_DetailDataAuthor
              data={data?.author as any}
            />

            <ComponentAdminInvestasi_DetailGambar imagesId={data?.imageId} />

            <ComponentAdminInvestasi_DetailData data={data as any} />
          </SimpleGrid>
          <ComponentAdminInvestasi_UIDetailFile
            title={data?.title}
            dataProspektus={data?.ProspektusInvestasi}
            listDokumen={data?.DokumenInvestasi}
            prospektusFileId={data?.prospektusFileId}
          />
        </>
      )}
      */}
    </>
  );
}
