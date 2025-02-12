"use client";

import { APIs } from "@/lib";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Box } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
const PdfToImage = dynamic(
  () =>
    import("../../_view/file_view/view_file_viewer").then((mod) => mod.default),
  { ssr: false }
);

export function Investasi_UiFileViewProspektus({
  pospektusId,
}: {
  pospektusId: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="" iconLeft={<IconX />} />}
      >
        <Box mb={"lg"}>
          <PdfToImage
            id={pospektusId}
            path={APIs.GET_NO_PARAMS}
          />
        </Box>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
