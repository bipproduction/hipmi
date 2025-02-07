"use client";

import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import {
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../_component/detail_gambar_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../_component/ui_detail_file";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export function AdminInvestasi_DetailReject({ data }: { data: MODEL_INVESTASI }) {
  return (
    <>
      <Stack px={"lg"}>
        <AdminGlobal_ComponentBackButton />
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          <Paper bg={AdminColor.softBlue} p={"lg"}>
            <Stack>
              <Title order={3} c={"red"}>
                #{" "}
                <Text span inherit c={AdminColor.white}>
                  Alasan penolakan
                </Text>
              </Title>
              <Text c={AdminColor.white}>{data.catatan}</Text>
            </Stack>
          </Paper>
        </SimpleGrid>

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
          <ComponentAdminInvestasi_DetailDataAuthor data={data.author} />

          {/* Data Foto */}
          <ComponentAdminInvestasi_DetailGambar imagesId={data.imageId}  />

          {/* Data Detail */}
          <ComponentAdminInvestasi_DetailData data={data} />
        </SimpleGrid>

        <ComponentAdminInvestasi_UIDetailFile
          title={data.title}
          dataProspektus={data.ProspektusInvestasi}
          listDokumen={data.DokumenInvestasi}
          prospektusFileId={data.prospektusFileId}
        />
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
