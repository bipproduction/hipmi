"use client";

import { apiGetOneProfileById } from "@/app_modules/katalog/profile/lib/api_fetch_profile";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { ActionIcon, Avatar, Grid, Stack, Text } from "@mantine/core";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MainColor } from "../color";
import { ComponentGlobal_NotifikasiPeringatan } from "../notif_global";
import { ComponentGlobal_LoaderAvatar } from "./comp_load_avatar";
import ComponentGlobal_Loader from "./loader";

type IFontSize = "xs" | "sm" | "md" | "lg" | "xl";
export function ComponentGlobal_AvatarAndUsername({
  profile,
  component,
  sizeAvatar,
  fontSize,
}: {
  profile: Prisma.ProfileSelect;
  component?: React.ReactNode;
  sizeAvatar?: number;
  fontSize?: IFontSize | {};
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  async function onCheckProfile() {
    try {
      const res = await apiGetOneProfileById({ id: profile.id as any });

      if (res && res.success) {
        setVisible(true);
        router.push(RouterProfile.katalog({ id: profile.id as any }));
      } else {
        ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Grid align="flex-start" justify="space-around">
        <Grid.Col span={"content"} style={{ minHeight: 50 }}>
          <ActionIcon
            radius={"xl"}
            variant="transparent"
            onClick={() => onCheckProfile()}
          >
            {visible ? (
              <Avatar radius={"xl"} size={40}>
                <ComponentGlobal_Loader />
              </Avatar>
            ) : (
              <ComponentGlobal_LoaderAvatar
                fileId={profile?.imageId as any}
                sizeAvatar={sizeAvatar}
              />
            )}
          </ActionIcon>
        </Grid.Col>
        <Grid.Col span={"auto"} style={{ minHeight: 50 }}>
          <Stack justify="center" h={30}>
            <Text
              c={MainColor.white}
              fw={"bold"}
              fz={fontSize ? fontSize : "md"}
              lineClamp={1}
              onClick={() => onCheckProfile()}
            >
              {profile?.name}
            </Text>
          </Stack>
        </Grid.Col>

        {component && (
          <Grid.Col span={"auto"} style={{ minHeight: 50 }}>
            <Stack justify="center" h={30}>
              {component}
            </Stack>
          </Grid.Col>
        )}
      </Grid>
    </>
  );
}
