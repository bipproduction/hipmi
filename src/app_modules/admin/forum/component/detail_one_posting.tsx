"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_FORUM_POSTING } from "@/app_modules/forum/model/interface";
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

export default function ComponentAdminForum_ViewOneDetailPosting({
  dataPosting,
}: {
  dataPosting: MODEL_FORUM_POSTING;
}) {
  return (
    <>
      <Stack spacing={"xs"} h={"100%"} w={"50%"}>
        <Paper bg={AdminColor.softBlue} p={"xs"} style={{ borderRadius: "6px" }}>
          <Title order={4} c={"white"}>
            Detail Posting
          </Title>
        </Paper>

        <Paper  p={"md"} radius={"md"} bg={AdminColor.softBlue} shadow="sm">
          <Stack>
            <Stack spacing={5}>
              <Group position="apart">
                <Text c={AdminColor.white} fw={"bold"}>
                  Username:{" "}
                  <Text span inherit>
                    {dataPosting?.Author?.username}
                  </Text>
                </Text>

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
              {/* <Divider /> */}
            </Stack>

            <Box>
              <Spoiler
                c={AdminColor.white}
                w={500}
                hideLabel="sembunyikan"
                maxHeight={100}
                showLabel="tampilkan"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataPosting?.diskusi,
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
