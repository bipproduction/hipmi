"use client";

import { gs_admin_ntf } from "@/app/lib/global_state";
import {
  ActionIcon,
  AppShell,
  Button,
  Divider,
  Drawer,
  Grid,
  Group,
  Indicator,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccentColor } from "../_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "../_global/notif_global";
import { MODEL_USER } from "../home/model/interface";
import { MODEL_NOTIFIKASI } from "../notifikasi/model/interface";
import {
  Admin_ComponentButtonUserCircle,
  Admin_ComponentSkeletonNavbar,
  Admin_UiNavbar,
} from "./_admin_global";
import {
  gs_admin_navbar_menu,
  gs_admin_navbar_subMenu,
} from "./_admin_global/new_global_state";
import adminNotifikasi_getByUserId from "./notifikasi/fun/get/get_notifikasi_by_user_id";
import { ComponentAdmin_UIDrawerNotifikasi } from "./notifikasi/ui_drawer_notifikasi";

export function Admin_NewLayout({
  children,
  user,
  countNotifikasi,
  listNotifikasi,
  version,
}: {
  children: React.ReactNode;
  user: MODEL_USER;
  countNotifikasi: number;
  listNotifikasi: MODEL_NOTIFIKASI[];
  version: string;
}) {
  const router = useRouter();
  const matches = useMediaQuery("(min-width: 1024px)");
  const [dataUser, setDataUser] = useState(user);
  const userRoleId = dataUser.masterUserRoleId;
  const [opened, setOpened] = useState(false);
  const [activeId, setActiveId] = useAtom(gs_admin_navbar_menu);
  const [activeChildId, setActiveChildId] = useAtom(gs_admin_navbar_subMenu);
  const [dataNotifikasi, setDataNotifikasi] =
    useState<MODEL_NOTIFIKASI[]>(listNotifikasi);

  // Notifikasi
  const [isDrawerNotifikasi, setDrawerNotifikasi] = useState(false);
  const [countNtf, setCountNtf] = useState(countNotifikasi);
  const [newAdminNtf, setNewAdminNtf] = useAtom(gs_admin_ntf);

  useShallowEffect(() => {
    setCountNtf((e) => e + newAdminNtf), setNewAdminNtf(0);
  }, [newAdminNtf, setNewAdminNtf]);

  async function onLoadListNotifikasi() {
    const loadNotifikasi = await adminNotifikasi_getByUserId({ page: 1 });

    setDataNotifikasi(loadNotifikasi as []);
    setDrawerNotifikasi(true);
  }

  const [loadingLogout, setLoadingLogout] = useState(false);
  async function onClickLogout() {
    setLoadingLogout(true);
    const res = await fetch(`/api/auth/logout?id=${user.id}`, {
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
      <AppShell
        padding="md"
        navbarOffsetBreakpoint={1024}
        navbar={
          <Navbar
            height={"100%"}
            width={{ base: 250 }}
            hiddenBreakpoint={1024}
            hidden={!opened}
            p="xs"
            bg={AccentColor.darkblue}
          >
            {!matches ? (
              <Admin_ComponentSkeletonNavbar />
            ) : (
              <>
                <Navbar.Section style={{ color: "white" }}>
                  <Stack spacing={"lg"}>
                    <Grid>
                      <Grid.Col span={7}>
                        <Title order={3} lineClamp={1}>
                          {userRoleId == "2" ? "Admin" : "Developer"}
                        </Title>
                      </Grid.Col>

                      <Grid.Col span={5}>
                        <Stack h={"100%"} justify="center">
                          <Group position="right" spacing={5}>
                            <Admin_ComponentButtonUserCircle
                              dataUser={dataUser}
                            />

                            <ActionIcon
                              variant="transparent"
                              onClick={() => {
                                onLoadListNotifikasi();
                              }}
                            >
                              {countNtf == 0 ? (
                                <IconBell color="white" />
                              ) : (
                                <Indicator
                                  processing
                                  label={<Text fz={10}>{countNtf}</Text>}
                                >
                                  <IconBell color="white" />
                                </Indicator>
                              )}
                            </ActionIcon>
                          </Group>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                    <Divider color="white" />
                  </Stack>
                </Navbar.Section>

                <Navbar.Section
                  grow
                  component={ScrollArea}
                  style={{ color: "white", transition: "0.5s" }}
                >
                  <Stack style={{ color: "white" }}>
                    <Admin_UiNavbar
                      userRoleId={userRoleId}
                      activeId={activeId as any}
                      activeChildId={activeChildId as any}
                      setActiveId={setActiveId}
                      setActiveChildId={setActiveChildId}
                    />
                  </Stack>
                </Navbar.Section>

                <Navbar.Section>
                  <Stack>
                    <Divider />
                    <Group position="center">
                      <Text fs={"italic"} c={"white"} fz={"xs"}>
                        V {version}
                      </Text>
                    </Group>
                  </Stack>
                </Navbar.Section>
              </>
            )}
          </Navbar>
        }
      >
        {!matches ? (
          <Stack align="center" justify="center" h={"100%"}>
            <Title>Sorry !</Title>
            <Title order={4} align="center">
              View Only Available For Desktop
            </Title>
            <Button onClick={() => onClickLogout()}>Logout</Button>
          </Stack>
        ) : (
          children
        )}
      </AppShell>

      {/*  Notifikasi */}
      <Drawer
        title={
          <Group position="apart">
            <Text fw={"bold"} fz={"lg"}>
              Notifikasi
            </Text>
          </Group>
        }
        opened={isDrawerNotifikasi}
        onClose={() => setDrawerNotifikasi(false)}
        position="right"
        size={"sm"}
      >
        <ComponentAdmin_UIDrawerNotifikasi
          newAdminNtf={newAdminNtf}
          listNotifikasi={dataNotifikasi}
          onChangeNavbar={(val: { id: string; childId: string }) => {
            setActiveId(val.id as any);
            setActiveChildId(val.childId);
          }}
          onToggleNavbar={(val: any) => {
            setDrawerNotifikasi(val);
          }}
          onLoadCountNotif={(val: any) => {
            setCountNtf(val);
          }}
        />
      </Drawer>
    </>
  );
}
