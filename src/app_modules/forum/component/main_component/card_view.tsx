"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Box, Group, Stack, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_BerandaHeaderCard from "./card_header";
import { Comp_V3_SetHtmlWithSticker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { useShallowEffect } from "@mantine/hooks";

export default function ComponentForum_BerandaCardView({
  data,
  userLoginId,
  onLoadData,
  allData,
}: {
  data: MODEL_FORUM_POSTING;
  userLoginId: string;
  onLoadData: (val: any) => void;
  allData: any[];
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentForum_BerandaHeaderCard
            data={data}
            isMoreButton={true}
            userLoginId={userLoginId}
            onLoadData={onLoadData}
            allData={allData}
          />

          <Box
            sx={{ zIndex: 0 }}
            p={"lg"}
            onClick={() => {
              setVisible(true), router.push(RouterForum.main_detail + data?.id);
            }}
          >
            <Text c={"white"} fz={"sm"} lineClamp={4}>
              <Comp_V3_SetHtmlWithSticker
                props={data?.diskusi}
                className="chat-content"
                style={{
                  height: 100,
                }}
              />
            </Text>
          </Box>

          <Group spacing={"xs"}>
            {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
              <IconMessageCircle color="white" size={25} />
            ) : (
              <IconMessageCircleX color="gray" size={25} />
            )}

            <Text
              color={
                (data?.ForumMaster_StatusPosting?.id as any) === 1
                  ? "white"
                  : "gray"
              }
            >
              {data?.Forum_Komentar.length}
            </Text>
          </Group>
          {visible && <ComponentGlobal_CardLoadingOverlay />}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
