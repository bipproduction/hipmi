"use client";

import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { ComponentGlobal_AvatarAndUsername } from "@/app_modules/_global/component";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import { ActionIcon, Group, Stack } from "@mantine/core";
import { IconDots, IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentColab_CardSectionHeaderAuthorName({
  isAuthor,
  colabId,
  profile,
}: {
  isAuthor?: boolean;
  colabId?: string;
  profile?: any;
}) {
  const router = useRouter();

  return (
    <>
      <Stack spacing={"xs"}>
        <ComponentGlobal_AvatarAndUsername
          profile={profile}
          component={
            <Group position="right">
              <ButtonAction
                isAuthor={isAuthor as any}
                colabId={colabId as any}
              />
            </Group>
          }
        />

        {/* <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (profileId) {
                router.push(RouterProfile.katalogOLD + profileId);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            <Avatar
              size={30}
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
            <Stack justify="center" h={"100%"}>
              <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                {authorName ? authorName : "Nama author"}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
          </Grid.Col>
        </Grid> */}
        {/* {isPembatas ? <Divider /> : ""} */}
      </Stack>
    </>
  );
}

function ButtonAction({
  isAuthor,
  colabId,
}: {
  isAuthor: boolean;
  colabId: string;
}) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Edit Proyek",
      icon: <IconEdit />,
      path: RouterColab.edit + colabId,
    },
  ];

  return (
    <>
      <ActionIcon variant="transparent" onClick={() => setOpenDrawer(true)}>
        {isAuthor ? <IconDots size={20} color="white" /> : ""}
      </ActionIcon>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
