"use client";

import { Stack, Paper, Text, List, Box } from "@mantine/core";
import { useState } from "react";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { useShallowEffect } from "@mantine/hooks";
import { Comp_V3_SetInnerHTMLWithStiker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { apiGetOneReportKomentarById } from "../api_fetch_forum";
import { useParams } from "next/navigation";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function ComponentForum_UiDetailReportKomentar() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_FORUM_KOMENTAR | null>(null);
  const [list, setList] = useState<any[]>([]);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetOneReportKomentarById({
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
            Komentar anda telah dihapus dari sebuah postingan oleh ADMIN, karena
            memiliki beberapa laporan dari pengguna lain !
          </Text>

          <Stack spacing={"xs"}>
            <Text fw={"bold"}>Komentar anda</Text>
            <Box
              style={{
                backgroundColor: MainColor.soft_darkblue,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text fz={"sm"} color="white">
                {data?.komentar ? (
                  <Comp_V3_SetInnerHTMLWithStiker
                    props={data.komentar}
                    className="chat-content"
                  />
                ) : (
                  ""
                )}
              </Text>
            </Box>
          </Stack>

          <Stack spacing={"xs"}>
            <Text fw={"bold"}>
              Pada postingan : {data.Forum_Posting.Author.username}
            </Text>
            {/* CONTENT */}
            <Box
              style={{
                backgroundColor: MainColor.soft_darkblue,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text fz={"sm"} color="white">
                {data?.Forum_Posting.diskusi ? (
                  <Comp_V3_SetInnerHTMLWithStiker
                    props={data.Forum_Posting.diskusi}
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
