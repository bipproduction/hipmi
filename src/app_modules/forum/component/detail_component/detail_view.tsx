"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Box, Group, Stack, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_DetailHeader from "./detail_header";

export default function ComponentForum_DetailForumView({
  data,
  totalKomentar,
  userLoginId,
  onLoadData,
}: {
  data: MODEL_FORUM_POSTING;
  totalKomentar: number;
  userLoginId: string;
  onLoadData: (val: any) => void;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          {/* HEADER */}
          <ComponentForum_DetailHeader
            data={data}
            userLoginId={userLoginId}
            onLoadData={(val) => {
              onLoadData(val);
            }}
          />

          {/* CONTENT */}
          <Box p={"lg"} >
            <Text fz={"sm"} color="white">
              {data?.diskusi ? (
                <div dangerouslySetInnerHTML={{ __html: data?.diskusi }} />
              ) : (
                ""
              )}
            </Text>
          </Box>

          {/* FOOTER */}
          <Stack>
            <Group position="apart">
              <Group spacing={"xs"} px={"sm"}>
                {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
                  <IconMessageCircle color="white" size={25} />
                ) : (
                  <IconMessageCircleX color="gray" size={25} />
                )}
                <Text
                  c={
                    (data?.ForumMaster_StatusPosting?.id as any) === 1
                      ? "white"
                      : "gray"
                  }
                >
                  {totalKomentar}
                </Text>
              </Group>
              <Group>
                <Text c={"white"} fz={"sm"}>
                  {new Date(data?.createdAt).toLocaleTimeString()}
                  {/* {new Intl.RelativeTimeFormat("id", {style: "short"}).format(-1,"day")} */}
                </Text>
                <Text c={"white"} fz={"sm"}>
                  {data?.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })
                    : new Date().toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                </Text>
              </Group>
            </Group>
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
