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

export default function ComponentAdminForum_ViewOneDetailKomentar({
  dataKomentar,
}: {
  dataKomentar: MODEL_FORUM_KOMENTAR;
}) {
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

            <Box>
              <Spoiler
                hideLabel="sembunyikan"
                maxHeight={100}
                showLabel="tampilkan"
              >
                <Comp_DangerouslySetInnerHTML props={dataKomentar?.komentar} />
              </Spoiler>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
