"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_FORUM_POSTING } from "@/app_modules/forum/model/interface";
import {
  Badge,
  Group,
  Paper,
  Stack,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { AdminForum_CompTableSetHtmlStiker } from "./comp_table_set_html_stiker";

export default function ComponentAdminForum_ViewOneDetailPosting({
  dataPosting,
}: {
  dataPosting: MODEL_FORUM_POSTING;
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
      <Paper p={"md"} radius={"md"} bg={AdminColor.softBlue} shadow="sm">
        <Stack>
          <Stack spacing={5}>
            <Admin_V3_ComponentBreakpoint allCols={2}>
              <Text c={AdminColor.white} fw={"bold"}>
                Username:{" "}
                <Text span inherit lineClamp={1}>
                  {dataPosting?.Author?.username}
                </Text>
              </Text>

              <Group position="right">
                <Badge
                  color={
                    (dataPosting?.ForumMaster_StatusPosting?.id as any) === 1
                      ? "green"
                      : "red"
                  }
                >
                  {dataPosting?.ForumMaster_StatusPosting?.status}
                </Badge>
              </Group>
            </Admin_V3_ComponentBreakpoint>
            {/* <Divider /> */}
          </Stack>

          <AdminForum_CompTableSetHtmlStiker
            data={dataPosting.diskusi}
            classname="chat-content"
            maxHeight={100}
          />
        </Stack>
      </Paper>
    </>
  );
}
