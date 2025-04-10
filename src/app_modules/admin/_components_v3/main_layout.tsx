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
    Group,
    Header,
    MediaQuery,
    Navbar,
    ScrollArea,
    Stack,
    Text,
    useMantineTheme
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import {
    IconBriefcase,
    IconCoin,
    IconHome,
    IconMessage,
    IconUser
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import {
    Admin_UiNavbar
} from "../_admin_global";
import {
    gs_admin_navbar_menu,
    gs_admin_navbar_subMenu,
} from "../_admin_global/new_global_state";
import { Admin_V3_ComponentButtonUserCircle } from "./comp_button_user_circle";

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
  const router = useRouter();
  const [dataUser, setDataUser] = useState<MODEL_USER | null>(null);
  const userRoleId = dataUser?.masterUserRoleId;
  const [activeId, setActiveId] = useAtom(gs_admin_navbar_menu);
  const [activeChildId, setActiveChildId] = useAtom(gs_admin_navbar_subMenu);
  const [dataNotifikasi, setDataNotifikasi] =
    useState<MODEL_NOTIFIKASI[]>(listNotifikasi);

  // Notifikasi
  const [isDrawerNotifikasi, setDrawerNotifikasi] = useState(false);
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

  const [opened, { toggle, close }] = useDisclosure(false);


  return (
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
              <Admin_UiNavbar
                userRoleId={userRoleId as any}
                activeId={activeId as any}
                activeChildId={activeChildId as any}
                setActiveId={setActiveId}
                setActiveChildId={setActiveChildId}
              />
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

          {/* <Box mt="auto">
            <Divider my="sm" />
            <Group position="center" mt="md">
              <ThemeIcon size={36} radius="xl" color="blue">
                <IconBrandGithub size={18} />
              </ThemeIcon>
              <ThemeIcon size={36} radius="xl" color="blue">
                <IconBrandLinkedin size={18} />
              </ThemeIcon>
              <ThemeIcon size={36} radius="xl" color="blue">
                <IconMail size={18} />
              </ThemeIcon>
            </Group>
          </Box> */}
        </Navbar>
      }
      header={
        <Header
          height={"7vh"}
          px="md"
          bg={AccentColor.darkblue}
          //   style={{ border: "none" }}
        >
          <Group style={{ height: "100%" }} position="apart">
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                disabled={!dataUser}
                opened={opened}
                onClick={toggle}
                size="sm"
                color={!dataUser ? "gray" : AccentColor.white}
              />
            </MediaQuery>

            <Text size="lg" weight={700} c={MainColor.white}>
              HIMPI DASHBOARD
            </Text>

            <Admin_V3_ComponentButtonUserCircle dataUser={dataUser as any} />
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
