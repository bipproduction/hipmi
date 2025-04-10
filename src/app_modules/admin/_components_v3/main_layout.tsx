"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { gs_admin_ntf } from "@/lib/global_state";
import {
  AppShell,
  Burger,
  Divider,
  Drawer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import {
  IconBriefcase,
  IconCoin,
  IconHome,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Admin_UiNavbar } from "../_admin_global";
import {
  gs_admin_navbar_menu,
  gs_admin_navbar_subMenu,
} from "../_admin_global/new_global_state";
import { Admin_V3_ComponentButtonUserCircle } from "./comp_button_user_circle";
import { Admin_V3_SkeletonNavbar } from "./skeleton_navbar";

export function Admin_V3_MainLayout({
  children,
  userLoginId,
  countNotifikasi,
  listNotifikasi,
  version,
}: {
  children: React.ReactNode;
  userLoginId: string;
  countNotifikasi: number;
  listNotifikasi: MODEL_NOTIFIKASI[];
  version: string;
}) {
  const [dataUser, setDataUser] = useState<MODEL_USER | null>(null);
  const userRoleId = dataUser?.masterUserRoleId;
  const [activeId, setActiveId] = useAtom(gs_admin_navbar_menu);
  const [activeChildId, setActiveChildId] = useAtom(gs_admin_navbar_subMenu);
  const [dataNotifikasi, setDataNotifikasi] =
    useState<MODEL_NOTIFIKASI[]>(listNotifikasi);

  // Notifikasi
  const [countNtf, setCountNtf] = useState(countNotifikasi);
  const [newAdminNtf, setNewAdminNtf] = useAtom(gs_admin_ntf);

  useShallowEffect(() => {
    handleLoadUser();
  }, []);

  async function handleLoadUser() {
    try {
      const response = await apiGetUserById({ id: userLoginId });
      if (response && response.success) {
        setDataUser(response.data);
      } else {
        console.error("Failed to fetch user data", response);
        setDataUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }
  const [openPop, setOpenPop] = useState(false);
  const [opened, handlers] = useDisclosure(false);
  const [openedDrawer, handlersDrawer] = useDisclosure(false);
  const pathname = usePathname();

  const navLinks = [
    { icon: IconHome, label: "Home", path: "/" },
    { icon: IconBriefcase, label: "Portfolio", path: "/portfolio" },
    { icon: IconUser, label: "About Me", path: "/about" },
    { icon: IconCoin, label: "Price List", path: "/pricing" },
    { icon: IconMessage, label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <AppShell
        bg={MainColor.darkblue}
        padding={"md"}
        navbarOffsetBreakpoint="md"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="md"
            hidden={!opened}
            width={{ base: 250 }}
            bg={AccentColor.darkblue}
            style={{ borderColor: "transparent", transition: " ease 1s" }}
            height={"93vh"}
          >
            <Navbar.Section
              h={"88vh"}
              grow
              component={ScrollArea}
              style={{ color: "white", transition: "1s" }}
            >
              <Stack style={{ color: "white" }} mb={"lg"}>
                {!dataUser ? (
                  <Admin_V3_SkeletonNavbar />
                ) : (
                  <Admin_UiNavbar
                    userRoleId={userRoleId as any}
                    activeId={activeId as any}
                    activeChildId={activeChildId as any}
                    setActiveId={setActiveId}
                    setActiveChildId={setActiveChildId}
                  />
                )}
              </Stack>
            </Navbar.Section>

            <Navbar.Section h="5">
              <Stack>
                <Divider />
                <Group position="center">
                  <Text fs={"italic"} c={"white"} fz={"xs"}>
                    V {version}
                  </Text>
                </Group>
              </Stack>
            </Navbar.Section>

            {/* <Box  style={{ flex: "1" }}>
            <Stack spacing="xs">
              {navLinks.map((link) => (
                <Anchor
                  key={link.path}
                  component={Link}
                  href={link.path}
                  color={isActive(link.path) ? "blue" : "dimmed"}
                  weight={500}
                  p="xs"
                  style={{
                    display: "flex",
                    borderRadius: theme.radius.sm,
                    backgroundColor: isActive(link.path)
                      ? theme.colors.dark[6]
                      : "transparent",
                  }}
                  //   onClick={() => {
                  //     if (
                  //       typeof window !== "undefined" &&
                  //       window.innerWidth < theme.breakpoints.md
                  //     ) {
                  //       close();
                  //     }
                  //   }}
                >
                  <Group>
                    <link.icon size={18} />
                    <Text>{link.label}</Text>
                  </Group>
                </Anchor>
              ))}
            </Stack>
          </Box> */}
          </Navbar>
        }
        header={
          <Header height={"7vh"} px="md" bg={AccentColor.darkblue}>
            <Group style={{ height: "100%" }} position="apart">
              <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Burger
                  disabled={!dataUser}
                  opened={opened}
                  onClick={handlers.toggle}
                  size="sm"
                  color={!dataUser ? "gray" : AccentColor.white}
                />
              </MediaQuery>

              <Text size="lg" weight={700} c={MainColor.white}>
                HIMPI DASHBOARD
              </Text>

              <Admin_V3_ComponentButtonUserCircle
                dataUser={dataUser as any}
                openPop={openPop}
                setOpenPop={setOpenPop}
                setNavbarOpen={handlers.close}
                setDrawerNotifikasi={handlersDrawer.toggle}
              />
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>

      <Drawer
        styles={{
          content: {
            backgroundColor: AccentColor.blue,
            color: AccentColor.white,
          },
          header: {
            backgroundColor: AccentColor.darkblue,
            color: AccentColor.white,
          },
          close: {
            color: AccentColor.white,
            "&:hover": {
              backgroundColor: AccentColor.blue,
              color: AccentColor.white,
            },
          },
        }}
        title={
          <Group position="apart">
            <Text fw={"bold"} fz={"lg"}>
              Notifikasi
            </Text>
          </Group>
        }
        opened={openedDrawer}
        onClose={handlersDrawer.toggle}
        position="right"
        size={"sm"}
      >
        On Maintenance . . .
        {/* <ComponentAdmin_UIDrawerNotifikasi
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
              /> */}
      </Drawer>
    </>
  );
}
