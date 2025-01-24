"use client";

import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from "@mantine/core";
import { IconAlertTriangle, IconBookmark, IconBriefcase, IconHistory, IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";

export default function AdminEvent_Main({
  countPublish,
  countReview,
  countDraft,
  countReject,
  countTipeAcara,
  countRiwayat,
}: {
  countPublish: number;
  countReview: number;
  countDraft: number;
  countReject: number;
  countTipeAcara: number;
  countRiwayat: number
}) {
  const router = useRouter();

  const listStatus = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      path: RouterAdminEvent.table_publish,
      color: MainColor.green,
      icon: <IconUpload size={18} color="#4CAF4F"/>,
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      path: RouterAdminEvent.table_review,
      color: MainColor.orange,
      icon: <IconBookmark size={18}  color="#FF7043"/>
    },
    // {
    //   id: 3,
    //   name: "Draft",
    //   jumlah: countDraft,
    //   path: "",
    //   color: "yellow",
    // },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject,
      path: RouterAdminEvent.table_reject,
      color: MainColor.red,
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />
    },
    {
      id: 4,
      name: "Riwayat Event",
      jumlah: countRiwayat,
      path: RouterAdminEvent.table_publish,
      color: AccentColor.softblue,
      icon: <IconHistory size={18} color="#007CBA"/>
    },
  ];

  const listBox2 = [

    {
      id: 1,
      name: "Tipe Acara",
      jumlah: countTipeAcara,
      path: RouterAdminEvent.table_publish,
      color: "#A888E2",
      icon: <IconBriefcase size={18} color="#A888E2" />
    },
  ];

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />

        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listStatus.map((e, i) => (
            <Paper
              key={i}
              bg={e.color}
              shadow="md"
              radius="md"
              p="md"
            // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >

              <Stack spacing={0}>
                <Text fw={"bold"} color={AccentColor.white}>{e.name}</Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Title c={AccentColor.white}>{e.jumlah}</Title>
                  <ThemeIcon radius={"xl"} size={"md"} color={AccentColor.white}>
                    {e.icon}
                  </ThemeIcon>
                </Flex>
              </Stack>

            </Paper>
          ))}
        </SimpleGrid>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listBox2.map((e, i) => (
            <Paper
              key={i}
              bg={e.color}
              shadow="md"
              radius="md"
              p="md"
            // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
                <Stack spacing={0}>
                  <Text fw={"bold"} color={AccentColor.white}>{e.name}</Text>
                  <Flex align={"center"} justify={"space-between"}>
                    <Title c={AccentColor.white}>{e.jumlah}</Title>
                    <ThemeIcon radius={"xl"} size={"md"} bg={AccentColor.white}>
                      {e.icon}
                    </ThemeIcon>
                  </Flex>
                </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
