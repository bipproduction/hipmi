"use client";

import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import {
  Stack,
  Title,
  Divider,
  SimpleGrid,
  Paper,
  Center,
  Text,
  Box,
  Group,
  ActionIcon,
  Flex,
  ThemeIcon,
} from "@mantine/core";
import { IconAlertTriangle, IconBookmark, IconCategory, IconChevronsRight, IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AccentColor, MainColor } from "@/app_modules/_global/color";

export default function AdminDonasi_Main({
  countPublish,
  countReview,
  
  countReject,
}: {
  countPublish: number;
  countReview: number;
  
  countReject: number;
}) {
  const router = useRouter();
  const listBox = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      link: RouterAdminDonasi_OLD.table_publish,
      color: MainColor.green,
      icon: <IconUpload size={18} color="#4CAF4F"/>,
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      link: RouterAdminDonasi_OLD.table_review,
      color: MainColor.orange,
      icon: <IconBookmark size={18}  color="#FF7043"/>
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject,
      link: RouterAdminDonasi_OLD.table_reject,
      color: MainColor.red,
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />
    },
    {
      id: 4,
      name: "Kategori",
      jumlah: 5,
      link: RouterAdminDonasi_OLD.table_kategori,
      color: AccentColor.softblue,
      icon: <IconCategory size={18} color="#007CBA"/>

    }
  ];
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />

        <SimpleGrid
          cols={listBox.length}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listBox.map((e, i) => (
            <Paper
              key={i}
              bg={e.color}
              shadow="md"
              radius="md"
              p="md"
              // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
                <Stack spacing={0}>
                <Text c={AccentColor.white} fw={"bold"}>{e.name}</Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Title c={AccentColor.white} fw={"bold"}>{e.jumlah ? e.jumlah : 0}</Title>
                  <ThemeIcon color={AccentColor.white} radius={"xl"} size={"md"}>
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
