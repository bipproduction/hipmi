"use client";

import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { Warna } from "@/lib/warna";
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  Popover,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import {
  IconBell,
  IconHierarchy2,
  IconLogout,
  IconReplaceUser,
  IconUser,
  IconUserCircle
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Admin_ComponentModal } from "../_admin_global/_component/comp_admin_modal";

export function Admin_V3_ComponentButtonUserCircle({
  dataUser,
}: {
  dataUser: MODEL_USER | null;
}) {
  const router = useRouter();
  const [isOpenMenuUser, setOpenMenuUser] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const [openModalReplaceUser, setOpenModalReplaceUser] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingReplaceUser, setLoadingReplaceUser] = useState(false);

  const listMenu = [
    {
      icon: IconUser,
      label: dataUser?.username,
    },
    {
      icon: IconHierarchy2,
      label:
        dataUser?.masterUserRoleId == "2"
          ? "Admin "
          : dataUser?.masterUserRoleId == "3"
            ? "Super Admin"
            : "",
    },
  ];

  const listAction = [
    {
      icon: IconBell,
      label: "Notifikasi",
      color: "",
      onClick: () => console.log("Notifikasi"),
    },
    {
      icon: IconReplaceUser,
      label: "Tampilan user",
      color: "",
      onClick: () => setOpenModalReplaceUser(true),
    },
    {
      icon: IconLogout,
      label: "Logout",
      color: "red",
      onClick: () => setOpenModalLogout(true),
    },
  ];

  async function onClickLogout() {
    setLoadingLogout(true);
    const res = await fetch(`/api/auth/logout?id=${dataUser?.id}`, {
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
      <Popover opened={openPop} onChange={setOpenPop} position="left-start">
        <Popover.Target>
          <ActionIcon
            disabled={!dataUser}
            variant="transparent"
            onClick={() => {
              setOpenPop((o) => !o);
            }}
          >
            <IconUserCircle color={dataUser ? "white" : "gray"} />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown
          style={{
            backgroundColor: AccentColor.blue,
            color: AccentColor.white,
          }}
        >
          <Stack>
            {listMenu.map((e, i) => (
              <Group key={i}>
                <e.icon size={18} />
                <Text lineClamp={1} >{e.label}</Text>
              </Group>
            ))}

            <Divider />

            <SimpleGrid cols={3}>
              {listAction.map((e, i) => (
                <Center key={i}>
                  <ActionIcon variant="transparent" onClick={e.onClick}>
                    <e.icon color={e.color || "white"} />
                  </ActionIcon>
                </Center>
              ))}
            </SimpleGrid>

            {/* <SimpleGrid cols={2}>
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
            </SimpleGrid> */}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      {/* <Modal
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
      </Modal> */}

      <Admin_ComponentModal
        opened={openModalLogout}
        onClose={() => setOpenModalLogout(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={5} c={AccentColor.white}>
            Anda yakin ingin keluar ?
          </Title>
          <Group align="center" position="center">
            <Button
              onClick={() => {
                setOpenPop((o) => !o);
                setOpenModalLogout(false);
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
      </Admin_ComponentModal>

      <Admin_ComponentModal
        opened={openModalReplaceUser}
        onClose={() => setOpenModalReplaceUser(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={5} c={AccentColor.white}>
            Anda yakin ingin keluar ?
          </Title>
          <Group align="center" position="center">
            <Button
              onClick={() => {
                setOpenPop((o) => !o);
                setOpenModalReplaceUser(false);
              }}
              radius={50}
            >
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loadingLogout ? true : false}
              radius={50}
              bg={AccentColor.softblue}
              color="blue"
              onClick={() => {
                router.push("/dev/home", { scroll: false });
              }}
            >
              User Akses
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>
    </>
  );
}
