import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { SimpleGrid } from "@mantine/core";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../../_component/detail_gambar_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../../_component/ui_detail_file";
import SkeletonAdminInvestasi from "../../_component/skeleton_admin_investasi";

export function AdminInvestasi_ViewDetailData({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  return (
    <>
     {!data ? (<SkeletonAdminInvestasi/>) : ( <>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {/* Data Author */}
        <ComponentAdminInvestasi_DetailDataAuthor data={data?.author as any} />

        {/* Data Foto */}
        <ComponentAdminInvestasi_DetailGambar imagesId={data?.imageId } />

        {/* Data Detail */}
        <ComponentAdminInvestasi_DetailData data={data as any} />
      </SimpleGrid>
      <ComponentAdminInvestasi_UIDetailFile
        title={data?.title}
        dataProspektus={data?.ProspektusInvestasi}
        listDokumen={data?.DokumenInvestasi}
        prospektusFileId={data?.prospektusFileId}
      />
      </>)}
    </>
  );
}
