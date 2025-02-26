"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  apiGetPdfToImage,
  PageData,
} from "@/app_modules/_global/lib/api_fetch_global";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Investasi_UiFileViewProspektus() {
  const param = useParams<{ id: string }>();
  const prospektusId = param.id;

  const [pdfPages, setPdfPages] = useState<PageData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pdfsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        setLoading(true);
        const response = await apiGetPdfToImage({ id: prospektusId });

        console.log("res:", response)

        if (response) {
          setPdfPages(response.pages as any);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching PDF:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    };

    fetchPdfData();
  }, [prospektusId]);

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Pratinjau Prospektus"
            iconLeft={<IconX />}
          />
        }
      >
        <Box mb="lg">
          {loading ? (
            <CustomSkeleton height={"80vh"} width={"100%"} />
          ) : error ? (
            <Stack>
              <ComponentGlobal_IsEmptyData text="Maaf, PDF mengalami error" />
              <ComponentGlobal_IsEmptyData text={error} />
            </Stack>
          ) : (
            <div
              ref={pdfsRef}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {pdfPages?.map((page, index) => (
                <Image
                  key={`page-${index}`}
                  src={page.imageUrl}
                  alt={`Page ${page.pageNumber}`}
                  className="pdf-page"
                  width={500} // Adjust width as needed
                  height={707} // Adjust height as needed
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              ))}
            </div>
          )}
        </Box>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
