"use client";

import { Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { IconFlag, IconMessageReport, IconUpload } from "@tabler/icons-react";
import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminForum_Main({
  countPublish,
  countLaporanPosting,
  countLaporanKomentar,
}: {
  countPublish: number;
  countLaporanPosting: number;
  countLaporanKomentar: number;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <ForumMain
          countPublish={countPublish}
          countLaporanPosting={countLaporanPosting}
          countLaporanKomentar={countLaporanKomentar}
        />
      </Stack>
    </>
  );
}

function ForumMain({
  countPublish,
  countLaporanPosting,
  countLaporanKomentar,
}: {
  countPublish: number;
  countLaporanPosting: number;
  countLaporanKomentar: number;
}) {
  const listBox = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      color: "green",
      icon: <IconUpload size={18} color="#4CAF4F" />
    },
    {
      id: 2,
      name: "Report Posting",
      jumlah: countLaporanPosting,
      color: "orange",
      icon: <IconFlag size={18} color="#FF9800" />
    },
    {
      id: 3,
      name: "Report Komentar",
      jumlah: countLaporanKomentar,
      color: "red",
      icon: <IconMessageReport size={18} color="#F44336" />
    },
  ];
  return (
    <>
      <SimpleGrid
        cols={4}
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
            bg={AdminColor.softBlue}
            shadow="md"
            radius="md"
            p="md"
          // sx={{ borderColor: e.color, borderStyle: "solid" }}
          >
            <Stack spacing={0}>
              <Text fw={"bold"} c={AccentColor.white}>{e.name}</Text>
              <Flex align={"center"} justify={"space-between"}>
                <Title color={AccentColor.white}>{e.jumlah ? e.jumlah : 0}</Title>
                <ThemeIcon
                  radius={"xl"}
                  size={"md"}
                  color={AccentColor.white}
                >
                  {e.icon}
                </ThemeIcon>
              </Flex>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </>
  );
}
