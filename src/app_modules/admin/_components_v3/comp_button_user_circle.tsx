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
  MediaQuery,
  Popover,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBell,
  IconDotsVertical,
  IconHierarchy2,
  IconLogout,
  IconReplaceUser,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Admin_ComponentModal } from "../_admin_global/_component/comp_admin_modal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../_admin_global/admin_notifikasi/notifikasi_peringatan";

export function Admin_V3_ComponentButtonUserCircle({
  dataUser,
  openPop,
  setOpenPop,
  setNavbarOpen,
  setDrawerNotifikasi,
}: {
  dataUser: MODEL_USER | null;
  openPop: boolean;
  setOpenPop: React.Dispatch<React.SetStateAction<boolean>>;
  // setOpenPop: (open: boolean) => void;
  setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setNavbarOpen: (open: boolean) => void;
  setDrawerNotifikasi: React.Dispatch<React.SetStateAction<boolean>>;
  // setDrawerNotifikasi: (open: boolean) => void;
}) {
  const router = useRouter();

  // STATE DESKTOP VIEW
  const [dks_opened, setDksOpened] = useState(false);

  // STATE MOBILE VIEW
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const [openModalReplaceUser, setOpenModalReplaceUser] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingReplaceUser, setLoadingReplaceUser] = useState(false);

  const listMenuMobile = [
    {
      icon: IconUser,
      label: dataUser?.username,
      color: "",
      onClick: () => {},
    },
    {
      icon: IconHierarchy2,
      label:
        dataUser?.masterUserRoleId == "2"
          ? "Admin "
          : dataUser?.masterUserRoleId == "3"
            ? "Super Admin"
            : "",
      color: "",
      onClick: () => {},
    },
    {
      icon: IconBell,
      label: "Notifikasi",
      color: "",
      onClick: () => {
        ComponentAdminGlobal_NotifikasiPeringatan(
          "Notifikasi: Masih dalam pengembangan",
          2000
        );
        // setDrawerNotifikasi(true);
      },
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

  const listMenuDekstop = [
    {
      icon: IconBell,
      label: "Notifikasi",
      color: "",
      onClick: () => {
        ComponentAdminGlobal_NotifikasiPeringatan(
          "Notifikasi: Masih dalam pengembangan",
          2000
        );

        // setDrawerNotifikasi(true);
      },
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

  const PopoverButton = () => {
    return (
      <>
        <Popover opened={openPop} onChange={setOpenPop} position="bottom-end">
          <Popover.Target>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
                <ActionIcon
                  disabled={!dataUser}
                  variant="transparent"
                  onClick={() => {
                    setOpenPop((o) => !o);
                    setNavbarOpen(false);
                  }}
                >
                  <IconUserCircle
                    color={dataUser ? "white" : "gray"}
                    size={25}
                  />
                </ActionIcon>
              </MediaQuery>

              <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
                <Group spacing={"xl"}>
                  <Group>
                    <IconUserCircle
                      color={dataUser ? "white" : "gray"}
                      size={25}
                    />
                    <Text c="white" fz={"lg"} fw={500}>
                      {!dataUser?.username ? (
                        <CustomSkeleton height={16} width={100} radius={"xl"} />
                      ) : (
                        dataUser?.username
                      )}
                    </Text>{" "}
                    <Divider
                      orientation="vertical"
                      color={dataUser ? "white" : "gray"}
                    />
                    <Text c="white" fz={"lg"} fw={500}>
                      {!dataUser?.username ? (
                        <CustomSkeleton height={16} width={100} radius={"xl"} />
                      ) : dataUser?.masterUserRoleId == "2" ? (
                        "Admin"
                      ) : dataUser?.masterUserRoleId == "3" ? (
                        "Super Admin"
                      ) : (
                        ""
                      )}
                    </Text>{" "}
                  </Group>
                  <ActionIcon
                    disabled={!dataUser}
                    variant="transparent"
                    onClick={() => {
                      setOpenPop((o) => !o);
                      setNavbarOpen(false);
                    }}
                  >
                    <IconDotsVertical color={dataUser ? "white" : "gray"} />
                  </ActionIcon>
                </Group>
              </MediaQuery>
            </div>
          </Popover.Target>

          <Popover.Dropdown
            style={{
              backgroundColor: AccentColor.blue,
              color: AccentColor.white,
            }}
          >
            {/* <PopoverDropDownView /> */}
            <Stack>
              {/* Mobile View */}
              <>
                {listMenuMobile.map((e, i) => (
                  <MediaQuery
                    largerThan={"md"}
                    styles={{ display: "none" }}
                    key={i}
                  >
                    <Group onClick={e.onClick}>
                      <e.icon size={18} color={e.color || "white"} />
                      <Text c={e.color || "white"} lineClamp={1}>
                        {e.label}
                      </Text>
                    </Group>
                  </MediaQuery>
                ))}
              </>
              {/* Mobile View */}

              {/* Desktop View */}
              <>
                {listMenuDekstop.map((e, i) => (
                  <MediaQuery
                    smallerThan={"md"}
                    styles={{ display: "none" }}
                    key={i}
                  >
                    <Group
                      onClick={e.onClick}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <e.icon size={18} color={e.color || "white"} />
                      <Text c={e.color || "white"} lineClamp={1}>
                        {e.label}
                      </Text>
                    </Group>
                  </MediaQuery>
                ))}
              </>
              {/* Desktop View */}

              <Divider />
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </>
    );
  };

  return (
    <>
      <PopoverButton />

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
              loading={loadingLogout}
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
            Anda yakin ingin pindah ke tampilan user ?
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
              loading={loadingReplaceUser}
              radius={50}
              bg={AccentColor.softblue}
              color="blue"
              onClick={() => {
                router.push("/dev/home", { scroll: false });
                setLoadingReplaceUser(true);
              }}
            >
              Ke Tampilan User
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>
    </>
  );
}
