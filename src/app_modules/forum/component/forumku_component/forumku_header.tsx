"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Avatar, Badge, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_ForumkuMoreButton from "./forumku_more_button";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";

export default function ComponentForum_ForumkuHeaderCard({
  data,
  isMoreButton,
  userLoginId,
  onLoadData,
  allData,
}: {
  data: MODEL_FORUM_POSTING;
  isMoreButton: boolean;
  userLoginId: string;
  onLoadData: (val: any) => void;
  allData: any[];
}) {
  const router = useRouter();

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid align="center">
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (data.Author.id) {
                router.push(RouterForum.forumku + data.Author.id);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            <ComponentGlobal_LoaderAvatar
              fileId={data.Author.Profile.imageId as any}
            />
          </Grid.Col>

          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"} spacing={3}>
              <Grid>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} fz={"sm"} fw={"bold"} c={"white"}>
                    {data.Author.username
                      ? data.Author.username
                      : "Nama author  "}
                  </Text>
                </Grid.Col>
                <Grid.Col span={"content"}></Grid.Col>
              </Grid>

              <Badge
                w={70}
                variant="outline"
                color={
                  (data.ForumMaster_StatusPosting.id as any) === 1
                    ? "green"
                    : "red"
                }
              >
                <Text c={"white"} fz={10}>
                  {data?.ForumMaster_StatusPosting.status}
                </Text>
              </Badge>
            </Stack>
          </Grid.Col>

          <Grid.Col span={"content"}>
            <Group position="center" spacing={"xs"}>
              <Group spacing={3}>
                <Text c={"white"} fz={"sm"}>
                  {data.createdAt !== undefined && data?.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString(["id-ID"], {
                        day: "numeric",
                        month: "short",
                      })
                    : new Date().toLocaleDateString(["id-ID"], {
                        day: "numeric",
                        month: "short",
                      })}

                  <IconCircle
                    size={5}
                    color="white"
                    style={{ marginLeft: "5px" }}
                  />
                </Text>
              </Group>

              {isMoreButton ? (
                <Group position="right">
                  <ComponentForum_ForumkuMoreButton
                    authorId={data?.Author.id}
                    postingId={data?.id}
                    statusId={data?.ForumMaster_StatusPosting.id}
                    userLoginId={userLoginId}
                    onLoadData={onLoadData}
                    allData={allData}
                  />
                </Group>
              ) : (
                ""
              )}
            </Group>
          </Grid.Col>
        </Grid>
        {/* {isPembatas ? <Divider /> : ""} */}
      </Stack>
    </>
  );
}
