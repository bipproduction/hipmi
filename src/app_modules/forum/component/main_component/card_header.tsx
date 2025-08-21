"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Avatar, Badge, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_BerandaMoreButton from "./card_more_button";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";

export default function ComponentForum_BerandaHeaderCard({
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
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid align="center">
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (data.Author.id) {
                setIsLoading(true);
                router.push(RouterForum.forumku + data.Author.id);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            {isLoading ? (
              <Avatar
                size={40}
                radius={"100%"}
                style={{
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              >
                <ComponentGlobal_Loader variant="dots" />
              </Avatar>
            ) : (
              <ComponentGlobal_LoaderAvatar
                fileId={data.Author.Profile.imageId as any}
              />
            )}
          </Grid.Col>

          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"} spacing={3}>
              <Grid>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} fz={"sm"} fw={"bold"} color={"white"}>
                    {data.Author.Profile.name
                      ? data.Author.Profile.name
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
                <Text fz={10}>{data?.ForumMaster_StatusPosting.status}</Text>
              </Badge>
            </Stack>
          </Grid.Col>

          <Grid.Col span={"content"}>
            <Group position="center" spacing={"xs"}>
              <Group spacing={3}>
                <Text color={"white"} fz={"sm"}>
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
                  <ComponentForum_BerandaMoreButton
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
