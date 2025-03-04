"use client";

import { MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  apiGetPdfToImage,
  PageData,
} from "@/app_modules/_global/lib/api_fetch_global";
import { UIGlobal_DrawerCustom } from "@/app_modules/_global/ui";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ActionIcon, Box, Stack, Text } from "@mantine/core";
import { IconDotsVertical, IconDownload, IconX } from "@tabler/icons-react";
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
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        setLoading(true);
        const response = await apiGetPdfToImage({ id: prospektusId });

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

  const handleDownloadFromAPI = async () => {
    try {
      const response = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${prospektusId}`
      );
      const blob = await response.blob(); // Konversi respons ke Blob
      const url = window.URL.createObjectURL(blob); // Buat URL untuk Blob
      const link = document.createElement("a");
      link.href = url;
      link.download = `file-portofolio-${new Date()}.pdf`; // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Bersihkan URL
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Pratinjau Prospektus"
            iconLeft={<IconX />}
            customButtonRight={
              error && error !== "" ? (
                <ActionIcon disabled />
              ) : (
                <ActionIcon
                  variant="transparent"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <IconDotsVertical color="white" />
                </ActionIcon>
              )
            }
          />
        }
      >
        <Box mb="lg">
          {loading ? (
            <CustomSkeleton height={"80vh"} width={"100%"} />
          ) : error && error !== "" ? (
            <Stack>
              <ComponentGlobal_IsEmptyData text="Maaf, PDF mengalami error" />
              {/* <ComponentGlobal_IsEmptyData text={error} /> */}
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

      <UIGlobal_DrawerCustom
        close={() => setOpen(false)}
        opened={isOpen}
        component={
          <Stack align="center" spacing={"xs"}>
            <ActionIcon
              onClick={handleDownloadFromAPI}
              variant="transparent"
              c={MainColor.white}
            >
              <IconDownload />
            </ActionIcon>
            <Text fz={"sm"} align="center" color={MainColor.white}>
              Download
            </Text>
          </Stack>
        }
      />
    </>
  );
}
