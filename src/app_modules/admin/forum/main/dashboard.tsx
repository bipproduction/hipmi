"use client";

import { Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";

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
    },
    {
      id: 2,
      name: "Report Posting",
      jumlah: countLaporanPosting,
      color: "orange",
    },
    {
      id: 3,
      name: "Report Komentar",
      jumlah: countLaporanKomentar,
      color: "red",
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
            bg={`${e.color}.2`}
            shadow="md"
            radius="md"
            p="md"
            // sx={{ borderColor: e.color, borderStyle: "solid" }}
          >
            <Group position="center">
              <Stack align="center" spacing={0}>
                <Text>{e.name}</Text>
                <Title>{e.jumlah ? e.jumlah : 0}</Title>
              </Stack>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </>
  );
}
