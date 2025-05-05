"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Avatar, Divider, Grid, Group, Stack, Text } from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentForum_KomentarButtonMore from "./komentar_button_more";
import { useState } from "react";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { data } from "autoprefixer";
import { MODEL_PROFILE } from "@/app_modules/katalog/profile/model/interface";
import moment from "moment";
import { MODEL_FORUM_KOMENTAR } from "../../model/interface";

export default function ComponentForum_KomentarAuthorNameOnHeader({
  userId,
  komentarId,
  tglPublish,
  isPembatas,
  isMoreButton,
  setKomentar,
  postingId,
  userLoginId,
  profile,
  listKomentar,
}: {
  userId?: string;
  komentarId?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
  isMoreButton?: boolean;
  setKomentar?: any;
  postingId?: string;
  userLoginId: string;
  profile: MODEL_PROFILE;
  listKomentar?: MODEL_FORUM_KOMENTAR[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (userId) {
                setIsLoading(true);
                router.push(RouterForum.forumku + userId);
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
              <ComponentGlobal_LoaderAvatar fileId={profile.imageId as any} />
            )}
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"}>
              <Grid>
                <Grid.Col span={"auto"}>
                  <Text color="white" lineClamp={1} fz={"sm"} fw={"bold"}>
                    {profile.name ? profile.name : "Nama author  "}
                  </Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Group position="center" spacing={"xs"}>
              <Group spacing={3}>
                <Text c={"white"} fz={"sm"}>
                  {tglPublish
                    ? new Intl.DateTimeFormat("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(tglPublish))
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
                  <ComponentForum_KomentarButtonMore
                    userId={userId}
                    komentarId={komentarId}
                    postingId={postingId}
                    userLoginId={userLoginId}
                    setKomentar={setKomentar}
                    listKomentar={listKomentar}
                  />
                </Group>
              ) : (
                ""
              )}
            </Group>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
