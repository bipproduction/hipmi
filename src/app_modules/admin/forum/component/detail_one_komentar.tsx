"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_FORUM_KOMENTAR, MODEL_FORUM_POSTING } from "@/app_modules/forum/model/interface";
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
      <Stack spacing={"xs"} h={"100%"} w={"50%"}>
        <Paper bg={AdminColor.softBlue} p={"xs"} style={{ borderRadius: "6px" }}>
          <Title order={4} c={"white"}>
            Detail Komentar
          </Title>
        </Paper>

        <Paper  p={"md"} radius={"md"} bg={AdminColor.softBlue}>
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
                w={500}
                hideLabel="sembunyikan"
                maxHeight={100}
                showLabel="tampilkan"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataKomentar?.komentar,
                  }}
                />
              </Spoiler>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
