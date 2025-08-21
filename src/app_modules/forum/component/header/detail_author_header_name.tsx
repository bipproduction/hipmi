"use client";

import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import {
  Stack,
  Grid,
  Avatar,
  Divider,
  Text,
  Group,
  ThemeIcon,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { RouterForum } from "@/lib/router_hipmi/router_forum";
import {
  IconCircleFilled,
  IconDots,
  IconMessageCircle,
} from "@tabler/icons-react";
import { IconCircle } from "@tabler/icons-react";
import ComponentForum_PostingButtonMore from "../more_button/posting_button_more";
import ComponentForum_DetailMoreButton from "../more_button/detail_more_button";

export default function ComponentForum_DetailOnHeaderAuthorName({
  authorId,
  postingId,
  imagesId,
  authorName,
  username,
  isPembatas,
  userLoginId,
  statusId,
}: {
  authorId?: string;
  postingId?: string;
  imagesId?: string;
  authorName?: string;
  username?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
  statusId: string;
  userLoginId: string;
}) {
  const router = useRouter();

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (authorId) {
                router.push(RouterForum.forumku + authorId);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            <Avatar
              size={40}
              sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
              radius={"xl"}
              bg={"gray.1"}
              src={
                imagesId
                  ? RouterProfile.api_foto_profile + imagesId
                  : "/aset/global/avatar.png"
              }
            />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack spacing={0}>
              <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                {authorName ? authorName : "Nama author "}
              </Text>
            <Badge
              w={70}
              variant="light"
              color={(statusId as any) === 1 ? "green" : "red"}
            >
              <Text fz={10}>{(statusId as any) === 1 ? "Open" : "Close"}</Text>
            </Badge>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <ComponentForum_DetailMoreButton
              postingId={postingId}
              authorId={authorId}
              userLoginId={userLoginId}
              statusId={statusId}
            />
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
