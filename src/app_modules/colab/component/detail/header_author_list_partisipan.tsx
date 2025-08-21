"use client";

import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_AvatarAndUsername } from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Avatar,
  Divider,
  Drawer,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretRight, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ComponentColab_AuthorNameOnListPartisipan({
  author,
  isPembatas,
  deskripsi,
}: {
  author?: MODEL_USER;
  isPembatas?: boolean;
  deskripsi?: string;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack>
          <Group position="apart">
            <Title order={5}>Deskripsi Diri</Title>
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <Paper
            p={"xs"}
            style={{
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px ",
              color: "white",
            }}
          >
            <ScrollArea h={"20vh"} scrollbarSize={2}>
              <Text>{deskripsi}</Text>
            </ScrollArea>
          </Paper>
          {/* <Button radius={"xl"} onClick={close}>
            Tutup
          </Button> */}
        </Stack>
      </Drawer>

      <Stack spacing={"xs"} p={"xs"}>
        <ComponentGlobal_AvatarAndUsername
          profile={author?.Profile as any}
          fontSize={"sm"}
          component={
            <Stack justify="center" align="flex-end" h={"100%"}>
              {deskripsi ? (
                <ActionIcon
                  onClick={() => open()}
                  radius={"xl"}
                  variant="transparent"
                >
                  <IconCaretRight color={MainColor.yellow} />
                </ActionIcon>
              ) : (
                ""
              )}
            </Stack>
          }
        />
        {/* <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (author?.Profile.id) {
                router.push(RouterProfile.katalogOLD + author?.Profile.id);
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
                author?.Profile.imagesId
                  ? RouterProfile.api_foto_profile + author?.Profile.imagesId
                  : "/aset/global/avatar.png"
              }
            />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"}>
              <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                {author?.Profile.name ? author?.Profile.name : "Nama author"}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Stack justify="center" h={"100%"}>
              {deskripsi ? (
                <ActionIcon
                  onClick={() => open()}
                  radius={"xl"}
                  variant="transparent"
                >
                  <IconCaretRight color={"white"} />
                </ActionIcon>
              ) : (
                ""
              )}
            </Stack>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""} */}
      </Stack>
    </>
  );
}
