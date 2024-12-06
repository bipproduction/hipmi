"use client";

import { Warna } from "@/app/lib/warna";
import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Menu,
  Modal,
  Popover,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconPhone, IconUser, IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Admin_ComponentButtonUserCircle({
  dataUser,
}: {
  dataUser: MODEL_USER;
}) {
  const router = useRouter();
  const [isOpenMenuUser, setOpenMenuUser] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  async function onClickLogout() {
    setLoadingLogout(true);
    const res = await fetch(`/api/auth/logout?id=${dataUser.id}`, {
      method: "GET",
    });

    const result = await res.json();
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(result.message);
      router.push("/", { scroll: false });
    }
  }

  return (
    <>
      <Popover opened={openPop} onChange={setOpenPop} position="right-end">
        <Popover.Target>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setOpenPop((o) => !o);
            }}
          >
            <IconUserCircle color="white" />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown style={{ backgroundColor: AccentColor.blue }}>
          <Stack>
            <Grid>
              <Grid.Col span={2}>
                <IconUser />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>{dataUser.username}</Text>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={2}>
                <IconPhone />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>+{dataUser.nomor}</Text>
              </Grid.Col>
            </Grid>

            <Divider />

            <SimpleGrid cols={2}>
              <Button
                radius={"xl"}
                onClick={() => router.push("/dev/home", { scroll: false })}
              >
                User Access
              </Button>
              <Button
                radius={"xl"}
                color="red"
                onClick={() => setOpenModal(true)}
              >
                Keluar
              </Button>
            </SimpleGrid>
          </Stack>
        </Popover.Dropdown>
      </Popover>

      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={6}>Anda yakin ingin keluar ?</Title>
          <Group align="center" position="center">
            <Button
              onClick={() => {
                setOpenModal(false);
              }}
              radius={50}
            >
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loadingLogout ? true : false}
              radius={50}
              bg={Warna.merah}
              color="red"
              onClick={() => onClickLogout()}
            >
              Keluar
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );

  return (
    <>
      <Menu
        withArrow
        arrowPosition="center"
        opened={isOpenMenuUser}
        onChange={setOpenMenuUser}
        shadow="md"
        width={250}
        position="bottom-start"
        styles={{
          dropdown: {
            backgroundColor: AccentColor.blue,
            border: `1px solid ${AccentColor.skyblue}`,
          },
          item: {
            color: "white",
            ":hover": {
              backgroundColor: "gray",
            },
          },
          arrow: {
            borderTopColor: AccentColor.skyblue,
            borderLeftColor: AccentColor.skyblue,
          },
        }}
      >
        <Menu.Target>
          <IconUserCircle color="white" />
          {/* <ActionIcon variant="transparent">
          </ActionIcon> */}
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <Grid>
              <Grid.Col span={2}>
                <IconUser />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>{dataUser.username}</Text>
              </Grid.Col>
            </Grid>
          </Menu.Item>
          <Menu.Item>
            <Grid>
              <Grid.Col span={2}>
                <IconPhone />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>+{dataUser.nomor}</Text>
              </Grid.Col>
            </Grid>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item>
            {/* <Center py={"xs"}>
              <Admin_Logout />
            </Center> */}
            {/* <Button>Keluar</Button> */}
            <Text>Keluar</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
