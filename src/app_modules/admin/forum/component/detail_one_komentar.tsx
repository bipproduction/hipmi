"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Comp_DangerouslySetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_POSTING,
} from "@/app_modules/forum/model/interface";
import {
  Badge,
  Box,
  Divider,
  Group,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { AdminForum_CompTableSetHtmlStiker } from "./comp_table_set_html_stiker";

export default function ComponentAdminForum_ViewOneDetailKomentar({
  dataKomentar,
}: {
  dataKomentar: MODEL_FORUM_KOMENTAR;
}) {
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
      <Stack spacing={"xs"} h={"100%"}>
        <Paper p={"md"} radius={"md"} bg={AdminColor.softBlue}>
          <Stack>
            <Stack spacing={5}>
              <Group position="apart">
                <Text fw={"bold"} c={AdminColor.white}>
                  Username:{" "}
                  <Text span inherit>
                    {dataKomentar?.Author?.username}
                  </Text>
                </Text>
              </Group>
              {/* <Divider /> */}
            </Stack>

            <AdminForum_CompTableSetHtmlStiker
              data={dataKomentar.komentar}
              classname="chat-content"
              maxHeight={100}
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
