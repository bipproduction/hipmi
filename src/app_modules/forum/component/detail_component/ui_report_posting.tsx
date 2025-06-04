"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Comp_V3_SetInnerHTMLWithStiker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { Box, List, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import { apiGetOneReportedPostingById } from "../api_fetch_forum";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function ComponentForum_UiDetailReportPosting() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_FORUM_POSTING | null>(null);
  const [list, setList] = useState<any[]>([]);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetOneReportedPostingById({
        id: params.id,
      });

      if (response.success) {
        setData(response.data.data);
        setList(response.data.list);
      } else {
        setData(null);
        setList([]);
      }
    } catch (error) {
      console.error("Error get data report posting", error);
      setData(null);
      setList([]);
    }
  }

  useShallowEffect(() => {
    // Add custom style for stickers inside Quill editor
    const style = document.createElement("style");
    style.textContent = `
        .chat-content img {
        max-width: 70px !important;
        max-height: 70px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      // Clean up when component unmounts
      document.head.removeChild(style);
    };
  }, []);

  if (!data || !list) {
    return <CustomSkeleton height={400} />;
  }

  return (
    <>
      <Box
        p={"md"}
        style={{
          backgroundColor: MainColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        <Stack c="white">
          <Text fw={"bold"} align="center" mb={"lg"}>
            Postingan anda telah dihapus dari beranda oleh ADMIN, karena
            memiliki beberapa laporan dari pengguna lain !
          </Text>
          <Stack spacing={"xs"}>
            <Text fw={"bold"}>Pada postingan</Text>
            {/* CONTENT */}
            <Box
              style={{
                backgroundColor: MainColor.soft_darkblue,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text fz={"sm"} color="white">
                {data?.diskusi ? (
                  <Comp_V3_SetInnerHTMLWithStiker
                    props={data?.diskusi}
                    className="chat-content"
                  />
                ) : (
                  ""
                )}
              </Text>
            </Box>
          </Stack>

          <Stack spacing={"xs"}>
            <Text fw={"bold"}>Laporan yang diterima :</Text>
            <List withPadding>
              {list.map((x, i) => (
                <List.Item c={"white"} key={i}>
                  {x}
                </List.Item>
              ))}
            </List>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
